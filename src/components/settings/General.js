import React from 'react';
import Select from 'react-select'
import { withSettingsContext } from '../../contexts/Settings';
import { deepCompare, getFromLocalStorage, deepClone } from '../../utils/helpers';
import {
  updateGeneralSettingsFS
} from '../../api/settingsFirestore';
import { customSelectStyles, customSelectTheme } from '../../constants/styles';
import { Loader } from '../../components/Loader';

const LayoutOptions = [
  { value: 'left', label: 'Left Side' },
  { value: 'right', label: 'Right Side' },
  // { value: 'left-and-right', label: 'Both Side' },
  { value: 'center', label: 'Center' }
]
const ThemeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
]

const WidgetOptions = [
  { value: 'todo', label: 'Todo Widget' },  
]

export const General = withSettingsContext(
  class extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        generalSettings: props.generalSettings,
        initialState: (props.generalSettings ? JSON.parse(JSON.stringify(props.generalSettings)) : undefined),
        applyState: 'Done',
        isDirty: false,
      }
      this.updateInternalState = this.updateInternalState.bind(this);
      this.onSelectChange = this.onSelectChange.bind(this);
      this.apply = this.apply.bind(this);
      this.reset = this.reset.bind(this);
    }

    // Use this function carefully, because it will run before all render calls.
    static getDerivedStateFromProps(nextProps, prevState) {
      if (!deepCompare(prevState.initialState, nextProps.generalSettings)) {
        return {
          // TODO: How to make this better
          generalSettings: nextProps.generalSettings,
          initialState: (nextProps.generalSettings ? JSON.parse(JSON.stringify(nextProps.generalSettings)) : undefined),
          isDirty: false,
          applyState: 'Done'
        }
      } else {
        return null;
      }
    }

    onSelectChange(name, data) {
      switch (name) {
        case 'layout':
          this.updateInternalState('layout', data.value);
        break;
        case 'widget':
          this.updateInternalState('widgets', data ? [data.value] : []);
          break;
        case 'theme':
          this.updateInternalState('theme', data.value);
          break;
      }
    }

    updateInternalState(key, value) {
      let nextState = deepClone(this.state.generalSettings);
      nextState[key] = value;
      this.setState((state, props) => {
        let isEqual = deepCompare(nextState, state.initialState);
        return {
          isDirty: !isEqual,
          generalSettings: nextState 
        }
      });
    }

    async apply() {
      let payload = this.state.generalSettings;
      this.setState({ applyState: 'Pending' });
      // update and activate
      await updateGeneralSettingsFS(
        getFromLocalStorage('userData', 'id'),
        payload
      );
      // this.setState({ applyState: 'Done', isDirty: false, initialState: payload });

      // TODO: Here we need to update both context and localStorage. Think to find a better way
      this.props.updateSettings({ generalSettings: payload });
      localStorage.setItem('generalSettings', JSON.stringify(payload));
    };

    reset() {
      this.setState({
        generalSettings: this.state.initialState,
        isDirty: false
      });
    }


    render() {
      if (!this.state.generalSettings) {
        return (
          <Loader type='simple' />
        );
      }
      let { layout, theme, widgets } = this.state.generalSettings;
      let { applyState, isDirty } = this.state;
      let selectedTheme = ThemeOptions.find(x => x.value === theme);
      let selectedLayout = LayoutOptions.find(x => x.value === layout);
      let selectedWidget = WidgetOptions.find(x => x.value === widgets[0]);
      return (
        <div className='setting-500 clearfix'>
          <div className='mb-25 space-between-center'>
            <label> Select Theme </label>
            <Select 
              options={ThemeOptions} 
              value={selectedTheme} 
              onChange={this.onSelectChange.bind(this, 'theme')}
              styles={customSelectStyles}
              theme={customSelectTheme}
            />
          </div>
          <div className='mb-25 space-between-center'>
            <label> Select Layout </label>
            <Select name='layout' 
              options={LayoutOptions}
              value={selectedLayout}
              onChange={this.onSelectChange.bind(this, 'layout')} 
              styles={customSelectStyles}
              theme={customSelectTheme} />
          </div>
          <div className='mb-25 space-between-center'>
            <label> {selectedLayout.label} </label>
            <Select name='widget'
             isClearable={true}
             options={WidgetOptions}
             value={selectedWidget}
             onChange={this.onSelectChange.bind(this, 'widget')}
             styles={customSelectStyles}
            theme={customSelectTheme} />
          </div>
          <section className='float-right' >
            <button onClick={this.apply} disabled={!isDirty}>
              {applyState === 'Done' ? 'Apply' : 'Apply...'}
            </button>
            <button onClick={this.reset} disabled={!isDirty}>
              Reset
            </button>
          </section>
        </div>
      );
    }
  }
);