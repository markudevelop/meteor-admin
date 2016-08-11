import React from 'react';
import Loader from '../components/loader';
import Login from '../pages/login';
import App from '../containers/app-container';

export default class Auth extends React.Component {
  getView() {
    return this.props.canView() ? this.props.main : <Login />;
  }
  render() {
    return(
      <div id="auth" style={{ height: '100%' }}>
        { this.props.loggingIn ? <Loader/> : this.getView() }
      </div>
    );
  }
}
