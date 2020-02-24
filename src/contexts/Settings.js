import React from 'react';
import { getSettingsFS } from '../api/settingsFirestore';
import { getFromLocalStorage } from '../utils/helpers';

export const SettingsContext = React.createContext();
SettingsContext.displayName = 'SettingsContext'

// function which wraps the PassedComponent with the SettingsContext.Consumer
export function withSettingsContext(PassedComponent) {
  return (props) => (
    <SettingsContext.Consumer>
      {(context) => {
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
    };
  }

  async componentDidMount() {
    let settings = getFromLocalStorage('settings');
    if (!settings) {
      settings = await getSettingsFS(getFromLocalStorage('userData', 'id'));
      localStorage.setItem("settings", JSON.stringify(settings))
    }
    this.setState({
      settings
    });
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}