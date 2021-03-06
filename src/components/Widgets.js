import React from 'react';
import { withSettingsContext } from '../contexts/Settings';
import { MemoryRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { IndividualList } from './IndividualList';
import { Listcollection } from './ListCollection';
import { getFromLocalStorage } from './../utils/helpers';
import { Loader } from '../components/Loader';

const Todo = () => (
  <React.Fragment>    
    <Router>
      <Switch>
        <Route exact path='/' render={props => {
          let { force } = props.location;
          if ((!getFromLocalStorage('defaultList', 'id')) || (force)) {
            return (<Listcollection {...props} />) 
          }
          return (<Redirect
            to={{
              pathname: `/${getFromLocalStorage('defaultList', 'id')}`,
            }} />)
        }}/>
        <Route path='/:listId' render={props => <IndividualList {...props} />} />
      </Switch>
    </Router>
  </React.Fragment>  
);

export const Widgets = withSettingsContext(
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      /* Because during this phase both widgets and effect component will
         both be in loading state */
      if (!this.props.generalSettings) {
        return null;
      }
      let { layout, widgets } = this.props.generalSettings;
      let isTodoPresent = widgets[0] ? true: false
      let configClass;
      switch (layout) {
        case 'center':
          configClass = 'justify-content-center';
          break;
        case 'left':
          configClass = 'justify-content-start';
          break;
        case 'right':
          configClass = 'justify-content-end';
          break;
      }
      return (
        <div className={`widgets-container ${configClass}`}>
          {isTodoPresent ? <Todo /> : ''}
        </div>
      )
    }
  }
);