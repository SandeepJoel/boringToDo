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
import { Effect } from './components/Effect';
import { UserLoginSignup } from './components/UserLoginSignup';
import { UserProvider, withUserContext } from './contexts/User';
import { SettingsProvider } from './contexts/Settings';
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
        isSettingsOpened: true
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
            this.props.userName == "Guest" ?
            <UserLoginSignup/> 
            : 
            <SettingsProvider>
              {
                this.state.isSettingsOpened ?
                // Look how we are passing props to SettingsView Component                
                <SettingsView toggleSettings={this.toggleSettings}/>                
                 :
                <React.Fragment>
                   <Effect />
                   <div className='widgets-container'>
                      <Todo />
                   </div>
                   <FontAwesomeIcon className="settings-icon" icon='cog' size='lg' onClick={this.toggleSettings}></FontAwesomeIcon>
                </React.Fragment>
              }
              </SettingsProvider>
          }                 
        </React.Fragment>
      )
    }
  }
);

/* 
  Think on what if a child provider
  depends on an async data of parent provider
*/
ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
