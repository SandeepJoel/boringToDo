import React from 'react';
import { authStateChange } from '../api/auth';
import { UserContext } from '../components/UserLoginSignup';
import { getUserIdFromFS } from '../api/settingsFirestore';

export class UserProvider extends React.Component {
  constructor (props) {
    super (props);
    this.defaultState = {
      userName: "Guest",
      userPhotoUrl: "",
      userId: "",
    }
    this.state = Object.assign({}, this.defaultState);
  }
 
  componentDidMount () {
    authStateChange (
      // on google signIn state
      // TODO: could optimize here..
      async (user) => {
        let userData;
        if (localStorage.getItem("userData")) {
          userData = JSON.parse(localStorage.getItem("userData"));
        } else {
          /* this api call is critical to get our userId to get all widget data */
          userData = await getUserIdFromFS(user.displayName)
        }
        // the below line somehow is a hack to fix the first user sign-in non-render issue
        this.setState({
          userName: user.displayName,
          userPhotoUrl: user.photoURL,
          userId: userData.id
        })
        localStorage.setItem("userData", JSON.stringify(userData))
      },
      // on google signOut state
      () => {
        this.setState(this.defaultState);
        // need to do this better
        localStorage.removeItem("userData")
        localStorage.removeItem("listCollection")
        localStorage.removeItem("tasks")
      }
    )
  }

  render () {
    return (
      <UserContext.Provider value={{
        userData: this.state,
        }}>
        { this.props.children }
      </UserContext.Provider>
    );
  }
}