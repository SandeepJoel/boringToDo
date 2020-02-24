import React from 'react';
import { googleSignIn } from '../api/auth';

// TODO: move context to a separate file
export const UserContext = React.createContext();

// function which wraps the PassedComponent with the UserContext.Consumer
export function withUserContext(PassedComponent) {
  // research on why we need the below wrapper arrow function for props  
  return (props) =>  (
    <UserContext.Consumer>
      {(context) => {
        console.log('User Props', props);
        console.log('User context', context);
        return (
        <PassedComponent {...context} {...props}/>
      )}}
    </UserContext.Consumer>  
  );
}

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