import React from 'react';
import { allDocumentsDelete } from '../../../api/collections/methods';

const deleteAllDocuments = () => {
  const collectionName = FlowRouter.getParam('collectionName');
  allDocumentsDelete.call({ collectionName });
};

const DeleteAllDocumentsModal = (props) => (
  <div id="deleteAllDocumentsModal" className="modal">
    <div className="modal-content">
      <h4>Delete All Documents</h4>
      <p>Are you sure you want to delete all documents?</p>
    </div>
    <div className="modal-footer">
      <a onClick={()=> deleteAllDocuments()}
        className="modal-action modal-close waves-effect waves-green btn-flat">Yes</a>
      <a className="modal-action modal-close waves-effect waves-red btn-flat ">No</a>
    </div>
  </div>
);

export default DeleteAllDocumentsModal;
