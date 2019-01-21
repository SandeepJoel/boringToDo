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
import { IndividualListWithContext as IndividualList } from './components/IndividualList';
import { UserLoginSignup, withUserContext } from './components/UserLoginSignup';
import { UserProvider } from './providers/UserProvider';
import { SettingsView } from './components/SettingsView';
import { ListcollectionWithContext as Listcollection }  from './components/ListCollection';
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
  (props) => {
  return (
    <React.Fragment>
      { 
        props.userData.userName == "Guest" ?
         <UserLoginSignup/> 
         : 
         <React.Fragment>
           <Todo/>
           <SettingsView/>
         </React.Fragment>
      }                 
    </React.Fragment>
    )
  }
);

ReactDOM.render(
  <UserProvider>
    <App/>
  </UserProvider>,
  document.getElementById('root')
);
