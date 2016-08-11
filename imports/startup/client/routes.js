import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import AuthContainer from '../../ui/containers/auth-container';
import AppContainer from '../../ui/containers/app-container';
import Home from '../../ui/pages/home.jsx';
import Collection from '../../ui/pages/collection.jsx';
import Login from '../../ui/pages/login.jsx';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(AuthContainer, {
      main: <AppContainer main={(props)=> (<Home {...props}/>)} />,
    });
  },
});

FlowRouter.route('/collections/:collectionName/:page?', {
  name: 'collection',
  action() {
    mount(AuthContainer, {
      main: <AppContainer main={(props)=> (<Collection {...props}/>)}/>,
    });
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    mount(Login);
  }
})
