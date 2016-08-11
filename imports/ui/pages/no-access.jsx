import React from 'react';

const NoAccess = () => (
  <div className="container">
    <div className="row">
      <div className="col s12 m6 push-m3">
        <h5>No Access</h5>
        <p>Please login as an admin</p>
        <a href="#" onClick={()=>Meteor.logout()}>Logout</a>
      </div>
    </div>
  </div>
);

export default NoAccess;
