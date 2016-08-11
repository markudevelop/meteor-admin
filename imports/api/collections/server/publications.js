import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { Random } from 'meteor/random';
import { hasAccess } from '../../helpers/roles.js';
import {
  getAllAvailableCollections,
  HIDDEN_COLLECTIONS,
} from '../collections.js';

function checkAdminAccess() {
  if (!hasAccess(this.userId, 'admin')) {
    return this.stop();
  }
};

Meteor.publish('allCollections', function () {
  checkAdminAccess.call(this);

  const allCollections = getAllAvailableCollections();

  allCollections.forEach((collection)=> {
    let isHiddenCollection = HIDDEN_COLLECTIONS.indexOf(collection.name);
    if (isHiddenCollection !== -1) return;

    let documentsCount = collection.instance.find().count();
    this.added('Collections', Random.id(), {
      name: collection.name,
      // count: documentsCount,
    });
  });

  this.ready();
});

Meteor.publish('collectionDocuments', function (collectionName, page = 1) {
  check(collectionName, String);
  check(page, Match.Maybe(Number));
  checkAdminAccess.call(this);

  const limit = 10;
  const skip = limit * (page - 1);
  const collection = Mongo.Collection.get(collectionName);

  if (!collection) {
    this.error('non existing collection');
  }

  return collection.find({}, {
    sort: { _id: 1 },
    limit,
    skip,
  });
});

Meteor.publish('collectionCount', function (collectionName) {
  check(collectionName, String);
  checkAdminAccess.call(this);

  const collection = Mongo.Collection.get(collectionName);

  if (!collection) {
    this.error('non existing collection');
  }

  let cursor = collection.find({});
  let pollingInterval = 2 * 1000; // 2 sec

  return new Counter('collection-count', cursor, pollingInterval);
});
