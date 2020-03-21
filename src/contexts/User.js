import React from 'react';
import { authStateChange } from '../api/auth';
import { getUserIdFromFS } from '../api/settingsFirestore';
import { getFromLocalStorage } from '../utils/helpers';

export const UserContext = React.createContext();
UserContext.displayName = 'UserContext'

// function which wraps the PassedComponent with the UserContext.Consumer
export function withUserContext(PassedComponent) {
  return (props) => (
    <UserContext.Consumer>
      {(context) => {
        return (
          <PassedComponent {...context} {...props} />
        )
      }}
    </UserContext.Consumer>
  );
}

export class UserProvider extends React.Component {
  constructor (props) {
    super (props);
    this.defaultState = {
      userName: 'Guest',
      userPhotoUrl: '',
      userId: '',
    }
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.setUserState = this.setUserState.bind(this);
    this.removeUserState = this.removeUserState.bind(this);
  }
 
  async setUserState(user) {
    // TODO: This is the only way ?
    localStorage.setItem('userData', JSON.stringify({ id: user.uid }));
    this.setState({
      userName: user.displayName,
      userPhotoUrl: user.photoURL,
      userId: user.uid
    });    
  }

  removeUserState () {
    localStorage.removeItem('userData')
    localStorage.removeItem('generalSettings');
    localStorage.removeItem('activeBackgroundEffectSettings');
    localStorage.removeItem('tasks');
    localStorage.removeItem('defaultList')
    this.setState(this.defaultState);
  }

  componentDidMount () {
    authStateChange (
      this.setUserState,
      this.removeUserState
    )
  }

  render () {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
