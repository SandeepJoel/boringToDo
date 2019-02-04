import React from 'react';
import { googleSignOut } from '../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withUserContext } from './UserLoginSignup';
import { generateRandomString } from '../utils/helpers';
import { SettingsItem } from '../containers/SettingsItem';

export const SettingsView = withUserContext(
  class extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        currentNav: ""
      }
      this.selectSection = this.selectSection.bind(this);
    }

    selectSection (val) {
      this.setState({
        currentNav: val
      })
    }
  
    componentDidMount() {
      this.setState({
        currentNav: "todo"
      })
    }
  
    render () {
      return (
        <div className="settings-container">
          <header>  
              <h2>{this.props.userData.userName}</h2>
              <img src={this.props.userData.userPhotoUrl} width="50" height="50"></img>
              <button onClick={googleSignOut}>Google Sign out</button>
              <FontAwesomeIcon icon='window-close' size='2x' onClick={this.props.toggleSettings}></FontAwesomeIcon>
          </header>
          <div className="settings-body">
            <div className="settings-nav">
              {
                this.props.userData.userSettings && 
                Object.keys(this.props.userData.userSettings).map((val) => 
                (
                  <div key={generateRandomString()}  className={`nav-item ${this.state.currentNav === val ? 'active': ''}`} onClick={() => this.selectSection(val)}>
                    { val }
                  </div>
                )
                )
              }             
            </div>
            <div className="settings-details">
              <SettingsItem name={this.state.currentNav}/>
            </div>            
          </div>
        </div>    
      )
    }
  }
);