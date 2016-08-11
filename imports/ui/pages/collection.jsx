import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CollectionTable from '../components/tables/collection-table.jsx';
import Loader from '../components/loader';
import { setSchemaFromDoc } from '../components/modals/add-document.jsx';

class Collection extends React.Component {
  openModal() {
    setSchemaFromDoc();
    $('#addDocumentModal').openModal();
  }

  render () {
    let { collectionName, documents, isLoading, count, page } = this.props;
    return (
      <div className="container">

        <div className="row header">
          <div className="grid-example col s12 m6">
            <h5>{collectionName} ({count})</h5>
          </div>
          <div className="grid-example col s12 m6 align-right">
            <a onClick={this.openModal}
              className="waves-effect waves-light green right btn">Add New</a>
          </div>
        </div>
        { !isLoading ?
          <CollectionTable
            documents={documents}
            collectionName={collectionName}
            count={count}
            page={page}
          /> :
          <Loader/>
        }
      </div>
    );
  }
};

export default Collection = createContainer((props)=> {
  let documents = [];
  const collectionName = FlowRouter.getParam('collectionName');
  let page = FlowRouter.getParam('page') || 1;

  const handle = Meteor.subscribe('collectionDocuments', collectionName, parseInt(page));
  const handle2 = Meteor.subscribe('collectionCount', collectionName);
  const isLoading = !handle.ready() && !handle2.ready();
  const collectionInstance = Mongo.Collection.get(collectionName);
  const count = Counter.get('collection-count');


  if (collectionInstance) {
    documents = collectionInstance.find({}, {sort: { _id: 1 }}).fetch();
  }

  return {
    collectionName,
    isLoading,
    documents,
    count,
    page: parseInt(page),
  };
}, Collection);
