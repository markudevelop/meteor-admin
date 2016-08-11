import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

const Login = () => (
  <div className="container">
    <div className="row">
      <div className="col s12 m6 push-m3">
        <Blaze template="atForm" state="signIn" />
      </div>
    </div>
  </div>
);

export default Login;
