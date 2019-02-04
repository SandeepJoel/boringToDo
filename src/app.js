// main styles
import styles from './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// TODO: Later activate this router
// import { MemoryRouter } from 'react-router'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { IndividualList } from './components/IndividualList';
import { UserLoginSignup, withUserContext } from './components/UserLoginSignup';
import { UserProvider } from './providers/UserProvider';
import { SettingsView } from './components/SettingsView';
import { Listcollection }  from './components/ListCollection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas, far);

const Todo = () => (
  <Router>    
    <Switch>
      <Route exact path='/' component={Listcollection} />
      <Route path='/:listId' render={ props => <IndividualList {...props} />} />
    </Switch>
  </Router>
);

const App = withUserContext(
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
      return (
        <React.Fragment>
          { 
            this.props.userData.userName == "Guest" ?
            <UserLoginSignup/> 
            : 
            <React.Fragment>
              {
                this.state.isSettingsOpened ?
                <SettingsView toggleSettings={this.toggleSettings} />
                 :
                <React.Fragment>
                   <Todo/>
                  <FontAwesomeIcon className="settings-menu-icon" icon='bars' size='2x' onClick={this.toggleSettings}></FontAwesomeIcon>
                </React.Fragment>
              }
            </React.Fragment>
          }                 
        </React.Fragment>
      )
    }
  }
);

ReactDOM.render(
  <UserProvider>
    <App/>
  </UserProvider>,
  document.getElementById('root')
);
