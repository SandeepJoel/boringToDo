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
          <section className="sidebar-nav">
            <div className="user-info">
              <img className="pic" src={this.props.userData.userPhotoUrl} width="50" height="50"></img>
              <div className="text">
                <h4>{this.props.userData.userName}</h4>
                <p className="sub-text">abc@freshworks.com</p>
              </div>
            </div>            
            {
              this.props.userData.userSettings &&
              Object.keys(this.props.userData.userSettings).map((val) =>
                (
                  <div key={generateRandomString()}
                    className={`nav-item ${this.state.currentNav === val ? 'active' : ''}`}
                    onClick={() => this.selectSection(val)}>
                    {val}
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
              <SettingsItem name={this.state.currentNav}/>
            </div>            
          </div>
        </div>    
      )
    }
  }
);