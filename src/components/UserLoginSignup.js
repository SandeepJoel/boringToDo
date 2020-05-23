import React from 'react';
import { googleSignIn } from '../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <div className='backdrop white mb-20 text-center'>
            <FontAwesomeIcon className='mt-15 primary' icon='fire' size='3x' ></FontAwesomeIcon>
          </div>
          <h1 className='color-bright'>Creative New Tab</h1>
          <h3 className='color-white mb-25'>An extension which starts all your new tabs with creative effects.</h3>          
          <button onClick={googleSignIn.bind(null, this.setStatus)}>
            {this.state.status === '' ? 'Google Sign In' : this.state.status}
          </button>
        </div>        
      );
    }
}