import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/app.jsx';

export default AppContainer = createContainer(props => {

  return {
    user: Meteor.user(),
  };
}, App);
