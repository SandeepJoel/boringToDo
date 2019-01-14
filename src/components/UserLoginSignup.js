import React from 'react';
import { googleSignIn } from '../config/firestoreConfig';

export const UserContext = React.createContext();

export class UserLoginSignup extends React.Component {
    constructor (props) {
      super (props);
    }
    render () {
      return (        
        <button onClick={googleSignIn}>Google Sign In</button>
      );
    }
}