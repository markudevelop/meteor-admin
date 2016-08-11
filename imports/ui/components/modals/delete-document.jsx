import React from 'react';
import { documentDelete } from '../../../api/collections/methods';
import { currentDocument } from './modal-state';

const deleteDocument = () => {
  let { collectionName, doc } = currentDocument.get();
  documentDelete.call({ collectionName, docId: doc._id });
};

const DeleteDocumentModal = (props) => (
  <div id="deleteDocumentModal" className="modal">
    <div className="modal-content">
      <h4>Delete Document</h4>
      <p>Are you sure you want to delete this document?</p>
    </div>
    <div className="modal-footer">
      <a onClick={()=> deleteDocument()}
        className="modal-action modal-close waves-effect waves-green btn-flat">Yes</a>
      <a className="modal-action modal-close waves-effect waves-red btn-flat ">No</a>
    </div>
  </div>
);

export default DeleteDocumentModal;
