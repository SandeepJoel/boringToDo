import React from 'react';
import { googleSignIn } from '../api/auth';

export class UserLoginSignup extends React.Component {
    constructor (props) {
      super (props);
    }

    render () {
      return (
        <div className="box-container container-500-600">
          <button onClick={googleSignIn}>Google Sign In</button>
        </div>        
      );
    }
}