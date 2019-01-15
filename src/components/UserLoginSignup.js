import React from 'react';
import { googleSignIn } from '../config/firestoreConfig';

export const UserContext = React.createContext();

// function which wraps the PassedComponent with the UserContext.Consumer
export function withUserContext(PassedComponent) {
  // research on why we need the below function
  return function what_the_fuck_is_this_function(props) {
    return (
      <UserContext.Consumer>
      {(context) => (
        <PassedComponent {...context} {...props}/>
      )}
      </UserContext.Consumer>  
    );
  } 
}

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