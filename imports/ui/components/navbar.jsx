import React from 'react';

const Navbar = (props) => (
  <nav className="top-nav">
    <div className="nav-wrapper container">
      <a className="brand-logo">Admin</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a onClick={()=>Meteor.logout()}>Logout</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
    </div>
  </nav>
);

export default Navbar;
