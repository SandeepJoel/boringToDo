// main styles
import styles from './styles/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Effect } from './components/Effect';
import { UserLoginSignup } from './components/UserLoginSignup';
import { UserProvider, withUserContext } from './contexts/User';
import { SettingsProvider, withSettingsContext } from './contexts/Settings';
import { SettingsView } from './components/SettingsView';
import { Widgets } from './components/Widgets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFromLocalStorage } from './utils/helpers';
library.add(fas, far);

const App = withSettingsContext(withUserContext(
  class extends React.Component {
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

    render() {
      let { theme = 'light' } = this.props.generalSettings || {};
      return (
        <React.Fragment>
          {
            this.props.userName == "Guest" && !getFromLocalStorage('userData', 'id') ?
            <UserLoginSignup/>
            : 
              <div id='theme-container' data-theme={theme}>
              {
                this.state.isSettingsOpened ?
                // Look how we are passing props to SettingsView Component
                <SettingsView toggleSettings={this.toggleSettings}/>
                 :
                <React.Fragment>
                   <Effect />
                   <Widgets />
                   <FontAwesomeIcon className="settings-icon" icon='cog' size='lg' onClick={this.toggleSettings}></FontAwesomeIcon>
                </React.Fragment>
              }
            </div> 
          }                 
        </React.Fragment>
      )
    }
  }
));

/* 
  Think on what if a child provider
  depends on an async data of parent provider
*/
ReactDOM.render(
  <UserProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </UserProvider>,
  document.getElementById('root')
);
