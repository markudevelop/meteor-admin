import React from 'react';
import ReactDOM from 'react-dom';
import CollectionTableHead from './collection-table-head';
import CollectionTableBody from './collection-table-body';
import { currentDocument } from '../modals/modal-state';
import Pagination from '../pagination.jsx';

const NoDocuments = () => (
  <h5>No documents found</h5>
);

export default class CollectionTable extends React.Component {
  handleEdit (collectionName, _id) {
    const collection = Mongo.Collection.get(collectionName);
    const doc = collection.findOne(_id);
    currentDocument.set({
      collectionName,
      doc,
    });
    $('#editDocumentModal').openModal();
  }

  handleDelete (collectionName, _id) {
    currentDocument.set({
      collectionName,
      doc: {
        _id,
      }
    });
    $('#deleteDocumentModal').openModal();
  }

  render () {
    let { documents, collectionName, count, page } = this.props;

    if (!documents.length) {
      return <NoDocuments/>
    }

    let tableCells = Object.keys(documents[0]);
    // tableCells.splice(0, 1); // remove _id
    // tableCells = tableCells.slice(1);

    return (
      <div>
        <table className="responsive-table bordered">
          <CollectionTableHead cells={tableCells}/>
          <CollectionTableBody
            documents={documents}
            cells={tableCells}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            collectionName={collectionName}
          />
        </table>
        <Pagination count={count} page={page}/>
      </div>
    );
  }
}
