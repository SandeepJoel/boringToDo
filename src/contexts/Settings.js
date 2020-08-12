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
    this.updateSettings = (data) => {
      this.setState(data);
    }
    this.state = {
      updateSettings: this.updateSettings
    };
  }

  async componentDidMount() {
    let activeBackgroundEffectSettings, generalSettings;
    let userId = getFromLocalStorage('userData', 'id');
    if (!userId) {
      return;
    }
    let settings = await getSettingsFS(userId);
    activeBackgroundEffectSettings = settings.activeBackgroundEffect;
    generalSettings = settings.general;

    // flattening out context state for separation of concerns
    this.setState({
      activeBackgroundEffectSettings,
      generalSettings
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