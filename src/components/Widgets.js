import React from 'react';
import { withSettingsContext } from '../contexts/Settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { IndividualList } from './IndividualList';
import { Listcollection } from './ListCollection';

const Todo = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Listcollection} />
      <Route path='/:listId' render={props => <IndividualList {...props} />} />
    </Switch>
  </Router>
);

export const Widgets = withSettingsContext(
  class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      if (!this.props.generalSettings) {
        return (
          <React.Fragment>
            "Loading...."
          </React.Fragment>
        )
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