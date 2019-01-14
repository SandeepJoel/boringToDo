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
import IndividualList from './components/IndividualList';
import { UserLoginSignup, UserContext } from './components/UserLoginSignup';
import { UserProvider } from './providers/UserProvider';
import { Listcollection } from './components/ListCollection';
import { SettingsView } from './components/SettingsView';

library.add(fas, far);

const ListcollectionWrapper = () => (
  <UserContext.Consumer>
    {(context) => (
      <Listcollection {...context}/>
    )}
  </UserContext.Consumer>
);

const IndividualListWrapper = (props) => (
  <UserContext.Consumer>
    {(context) => (
      <IndividualList {...context} {...props}/>
    )}
  </UserContext.Consumer>
);

const AppWrapper = (props) => (
  <UserContext.Consumer>
    {(context) => (
      <App {...context} {...props}/>
    )}
  </UserContext.Consumer>
);


const Todo = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={ListcollectionWrapper} />
      <Route path='/:listId' render={ props => <IndividualListWrapper {...props} />} />
    </Switch>
  </Router>
);

const App = (props) => {
  return(
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

ReactDOM.render(
  <UserProvider>
    <AppWrapper/>
  </UserProvider>,
  document.getElementById('root')
);
