import React from 'react';
import { googleSignOut } from '../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withUserContext } from '../contexts/User';
import { generateRandomString } from '../utils/helpers';
import { SettingsItem } from '../containers/SettingsItem';
import { SettingsNav } from '../constants/settings';
import { withSettingsContext } from '../contexts/Settings';

export const SettingsView = withSettingsContext(withUserContext(
  class extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        currentNav: SettingsNav[1].key
      };
      this.selectSection = this.selectSection.bind(this);
    }

    selectSection (val) {
      this.setState({
        currentNav: val
      })
    }

    render () {
      return (
        <div className="settings-container">
          <section className="sidebar-nav">
            <div className="user-info">
              <img className="pic" src={this.props.userPhotoUrl} width="50" height="50"></img>
              <div className="text">
                <h4>{this.props.userName}</h4>
                <p className="sub-text">abc@freshworks.com</p>
              </div>
            </div>            
            {
              SettingsNav.map((val) =>
                (
                  <div key={generateRandomString()}
                    className={`nav-item ${this.state.currentNav === val.key ? 'active' : ''}`}
                    onClick={() => this.selectSection(val.key)}>
                    {val.type}
                  </div>
                )
              )
            }
            <div className='nav-item' onClick={googleSignOut}>Logout <FontAwesomeIcon className='logout' icon='sign-out-alt' size='lg'></FontAwesomeIcon></div>
          </section>
          <div className="settings">
            <header>
              <img src='https://via.placeholder.com/200x50?text=Newtab.com'></img>
              <FontAwesomeIcon className="close" icon='times' size='lg' onClick={this.props.toggleSettings}></FontAwesomeIcon>
            </header>            
            <div className="settings-details">
              {
                (this.props.settings ? 
                  <SettingsItem 
                    name={this.state.currentNav} 
                    selectedConfig={this.props.settings[this.state.currentNav]} 
                    /> 
                  :
                  ""
                )
              }
            </div>            
          </div>
        </div>    
      )
    }
  }
));