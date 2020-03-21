import React from 'react';
import { googleSignIn } from '../api/auth';

export class UserLoginSignup extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        status: ''
      }
      this.setStatus = this.setStatus.bind(this);
    }

    setStatus(val) {
      this.setState({
        status: val
      })
    }

    render () {
      return (
        <div className='login'>
          <h1> Creative New Tab</h1>
          <p>An extension which starts all your new tabs with creative effects</p>
          <h2> {this.state.status}</h2>
          <button onClick={googleSignIn.bind(null, this.setStatus)}>
            {this.state.status === '' ? 'Google Sign In' : this.state.status}
          </button>
        </div>        
      );
    }
}