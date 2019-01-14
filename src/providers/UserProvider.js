import React from 'react';
import {db, authStateChange } from '../config/firestoreConfig';
import { UserContext } from '../components/UserLoginSignup';
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
    console.log("componentDidMount in UserProvider");
    authStateChange (
      // on google signIn state
      (user) => {
        db.collection("users").where("userDetails.name", "==", user.displayName)
        .get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log("In PROVIDER");
            console.log(doc.id, "===>", doc.data());
            this.setState({
            userName: user.displayName,
            userPhotoUrl: user.photoURL,
            userId: doc.id
            })
        })
        })
        .catch((error) => {
        console.log("Error getting documents: ", error);
        });
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