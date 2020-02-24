import React from 'react';
import { authStateChange } from '../api/auth';
import { UserContext } from '../components/UserLoginSignup';
import { getUserIdFromFS } from '../api/settingsFirestore';
import { getFromLocalStorage } from '../utils/helpers';

export class UserProvider extends React.Component {
  constructor (props) {
    super (props);
    this.defaultState = {
      userName: "Guest",
      userPhotoUrl: "",
      userId: "",
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
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    this.setState({
      userName: user.displayName,
      userPhotoUrl: user.photoURL,
      userId: userId
    })
  }

  removeUserState () {
    this.setState(this.defaultState);
    localStorage.removeItem("userData")
    localStorage.removeItem("listCollection")
    localStorage.removeItem("tasks")
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
      <UserContext.Provider value={{
        userData: this.state,
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}