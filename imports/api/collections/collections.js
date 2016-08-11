import { Mongo } from 'meteor/mongo';

export const _getAllRemoteCollections = () => {
  var Future = Npm.require('fibers/future'),
    future = new Future(),
    db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

  db.listCollections().toArray(function (err, res) {
    if (err) throw new Meteor.Error(500, "failed");
    future.return(res);
  })
  return future.wait();
};

export const getAllAvailableCollections = () => {
  return Mongo.Collection.getAll() || [];
};

export const HIDDEN_COLLECTIONS = [
  'system.indexes',
  'meteor_autoupdate_clientVersions',
  'meteor_accounts_loginServiceConfiguration',
  'meteor_oauth_pendingCredentials',
];
