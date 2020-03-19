import React from 'react';
import { BackgroundEffectList } from '../../constants/settings';
import Select from 'react-select'
import { PlainBackground } from './BackgroundEffectsSettings/PlainBackground';
import { ColorLiquids } from './BackgroundEffectsSettings/ColorLiquids';
import { withSettingsContext } from '../../contexts/Settings';
import { customSelectStyles } from '../../constants/styles'

const EffectSettingsMap = {
  colorLiquids: ColorLiquids,
  plainBackground: PlainBackground
}  

export const BackgroundEffects = withSettingsContext(
  class extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        // This will available in props, because we are loading the
        // settings context in General settings page itself
        currentEffect: props.activeBackgroundEffectSettings.type,
        activeEffect: props.activeBackgroundEffectSettings.type
      };
      this.onChange = this.onChange.bind(this);
      this.updateBackgroundContext = this.updateBackgroundContext.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.activeEffect !== nextProps.activeBackgroundEffectSettings.type) {
        return { 
          currentEffect: nextProps.activeBackgroundEffectSettings.type,
          activeEffect: nextProps.activeBackgroundEffectSettings.type
         };
      }
      else return null;
    }

    onChange(option) {
      this.setState({
        currentEffect: BackgroundEffectList.find(x => x.value === option.value).value
      })
    }

    updateBackgroundContext(data) {
      this.props.updateSettings(data);
    }

    render() {
      if (!this.state.currentEffect) {
        return (
          <React.Fragment>
            Loading...
          </React.Fragment>
          );
      }
      let selectedOption = BackgroundEffectList.find(x => x.value === this.state.currentEffect);
      let CurrentSelectedSettings = EffectSettingsMap[this.state.currentEffect];
      let passProps = 
        (this.state.currentEffect === this.props.activeBackgroundEffectSettings.type)
          ? this.props.activeBackgroundEffectSettings
          : undefined;
      return (
        <React.Fragment>
        <div className='setting-500'>
          <div className='space-between-center'>
            <label>Select Effect</label>
            <Select 
              options={BackgroundEffectList}
              value={selectedOption}
              onChange={this.onChange} 
              styles={customSelectStyles} />
          </div>
        </div>
          {/* here if the passProps is available that means its present in context
          and if it is undefined then you need to fetch config from API */}
          <CurrentSelectedSettings
            config={passProps}
            updateBackgroundContext={this.updateBackgroundContext}
            activeEffect={this.state.activeEffect}
            currentEffect={this.state.currentEffect} /> 
        </React.Fragment>
      );
    }
  }
);