import React from 'react';
import { authStateChange } from '../api/auth';
import { UserContext } from '../components/UserLoginSignup';
import { getUserId } from '../api/todoFirestore';
export class UserProvider extends React.Component {
  constructor (props) {
    super (props);
    this.defaultState = {
      userName: "Guest",
      userPhotoUrl: "",
      userId: ""
    }
    this.state = this.defaultState;    
  }

  componentDidMount() {
    authStateChange (
      // on google signIn state
      async(user) => {
        this.setState({
          userName: user.displayName,
          userPhotoUrl: user.photoURL,
          userId: await getUserId(user.displayName)
        })
      },
      // on google signOut state
      () => {
        this.setState(this.defaultState);
      }
    )
  }

  render () {
    return (
      <UserContext.Provider value={{ userData: this.state }}>
        { this.props.children }
      </UserContext.Provider>
    );
  }
}