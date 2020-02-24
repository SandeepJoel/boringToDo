import React from 'react';
import { getSettingsFS } from '../api/settingsFirestore';
import { getFromLocalStorage } from '../utils/helpers';

export const SettingsContext = React.createContext();

// function which wraps the PassedComponent with the UserContext.Consumer
export function withSettingsContext(PassedComponent) {
  // research on why we need the below wrapper arrow function for props
  return (props) => (
    <SettingsContext.Consumer>
      {(context) => {
        console.log('Settings Props', props);
        console.log('Settings context', context);
        return (
          <PassedComponent {...context} {...props} />
        )
      }
      }
    </SettingsContext.Consumer>
  );
}

export class SettingsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {}
    };
  }

  async componentDidMount() {
    let settings = await getSettingsFS(getFromLocalStorage('userData', 'id'));
    this.setState({
      settings
    });
    if (!localStorage.getItem("settings")) {
      localStorage.setItem("settings", JSON.stringify(settings))
    }
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}