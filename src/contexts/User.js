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
    let userId = getFromLocalStorage('userData', 'id');    
    if (!userId) {
      /* this api call is critical to get our userId to get all widget data */
      let userData = await getUserIdFromFS(user.displayName);
      userId = userData.id;
      console.log('Got userId from API', userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    this.setState({
      userName: user.displayName,
      userPhotoUrl: user.photoURL,
      userId: userId
    })
  }

  removeUserState () {
    this.setState(this.defaultState);
    localStorage.removeItem('userData')
    localStorage.removeItem('settings');
    localStorage.removeItem('generalSettings');
    localStorage.removeItem('activeBackgroundEffectSettings');
    // localStorage.removeItem('tasks')
  }

  componentDidMount () {
    authStateChange (
      // TODO: could optimize here..
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
