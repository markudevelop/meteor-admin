import { Mongo } from 'meteor/mongo';
import { _getAllRemoteCollections } from '../../api/collections/collections.js';

const initCollectionsFromMongoDB = () => {
  let foundCollections = _getAllRemoteCollections();
  console.log(foundCollections);
  foundCollections.forEach((collection)=> {
    let exists = Mongo.Collection.get(collection.name);
    if (!exists) {
      new Mongo.Collection(collection.name);
    }
  });
};
Meteor.startup(function () {
  initCollectionsFromMongoDB();
});
