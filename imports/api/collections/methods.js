import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { getAllAvailableCollections } from './collections.js';
import { hasAccess } from '../helpers/roles.js';

const checkAdminAccess = (userId) => {
  if (!hasAccess(userId, 'admin')) {
    throw new Meteor.Error('no access');
  }
};

export const documentDelete = new ValidatedMethod({
  name: 'documents.delete',
  validate(){},
  run({ collectionName, docId }) {
    checkAdminAccess(this.userId);

    const collection = Mongo.Collection.get(collectionName);

    if (collection) {
      return collection.remove(docId);
    } else {
      throw new Meteor.Error('not-exists', 'We couldnt find the collection');
    }
  },
});

export const documentEdit = new ValidatedMethod({
  name: 'documents.edit',
  validate(){},
  run({ collectionName, doc }) {
    checkAdminAccess(this.userId);

    const collection = Mongo.Collection.get(collectionName);

    if (collection) {
      let docId = doc._id;
      delete doc._id;
      return collection.update(docId, { $set: doc });
    } else {
      throw new Meteor.Error('not-exists', 'We couldnt find the collection');
    }
  },
});

export const documentNew = new ValidatedMethod({
  name: 'documents.new',
  validate(){},
  run({ collectionName, doc }) {
    checkAdminAccess(this.userId);
    
    const collection = Mongo.Collection.get(collectionName);

    if (collection) {
      delete doc._id;
      return collection.insert(doc);
    } else {
      throw new Meteor.Error('not-exists', 'We couldnt find the collection');
    }
  },
});
