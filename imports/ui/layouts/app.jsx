import React from 'react';
import Navbar from '../components/navbar.jsx';
import Sidebar from '../components/sidebar.jsx';
import DeleteDocumentModal from '../components/modals/delete-document.jsx';
import DeleteAllDocumentsModal from '../components/modals/delete-all-documents.jsx';
import EditDocumentModal from '../components/modals/edit-document.jsx';
import AddDocumentModal from '../components/modals/add-document.jsx';
import NoAccess from '../pages/no-access.jsx';

export default class App extends React.Component {
  render () {
    let { main, user } = this.props;

    if (!Roles.userIsInRole(user, 'admin')) {
      return <NoAccess />;
    }

    return (
      <div id="app-layout">
        <Navbar/>
        <Sidebar/>
        <div className="main-content">
          {main(this.props)}
        </div>
        <DeleteDocumentModal/>
        <EditDocumentModal/>
        <AddDocumentModal/>
        <DeleteAllDocumentsModal/>
      </div>
    );
  }
}
