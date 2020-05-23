import React from 'react';
import { googleSignOut } from '../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withUserContext } from '../contexts/User';
import { generateRandomString } from '../utils/helpers';
import { SettingsItem } from '../containers/SettingsItem';
import { SettingsNav } from '../constants/settings';

export const SettingsView = withUserContext(
  class extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        currentNav: SettingsNav[0].key
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
            <section>
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
              <div className='nav-item' onClick={googleSignOut}>
                Logout
             </div>
            </section>
            <section className='text-center mb-50'>
              <div className='justify-content-center relative backdrop margin-left-auto margin-right-auto mb-20'>
                <FontAwesomeIcon className='mt-15' icon='fire' size='3x' color="#FFF"></FontAwesomeIcon>
              </div>
              <h3 className='bold primary'>Creative New Tab</h3>
              <span className='m-0'>An extension which starts all your new tabs with creative effects</span>
            </section>            
          </section>
          <div className="settings">
            <header>
              <h1 className='color-bright'>Settings</h1>
              <FontAwesomeIcon className="close color-bright" icon='times' size='2x' onClick={this.props.toggleSettings}></FontAwesomeIcon>
            </header>            
            <div className="mt-15 mb-15 ml-20 mr-20">
              <SettingsItem name={this.state.currentNav} />
            </div>          
          </div>
        </div>    
      )
    }
  }
);