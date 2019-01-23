import React from 'react';
import { googleSignOut } from '../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SettingsView = ({toggleSettings}) => {
  return (
    <div className="settings-container">
      <header>          
          <button onClick={googleSignOut}>Google Sign out</button>
          <FontAwesomeIcon icon='window-close' size='2x' onClick={toggleSettings}></FontAwesomeIcon>
      </header>
      <div className="settings-body">            
      </div>
    </div>    
  )
}

export class Settings extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isSettingsOpened: false
    }
    this.toggleSettings = this.toggleSettings.bind(this);    
  }

  toggleSettings () {
    this.setState (
      (prevState) => ({
          isSettingsOpened: !prevState.isSettingsOpened
        })
      )
  }

  render () {
    return (
      <React.Fragment>
      {
        this.state.isSettingsOpened ?
          <SettingsView toggleSettings={this.toggleSettings} />
           :
          <FontAwesomeIcon className="settings-menu-icon" icon='bars' size='2x' onClick={this.toggleSettings}></FontAwesomeIcon>
      }  
      </React.Fragment>      
    );
  }
}