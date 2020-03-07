import React from 'react';
import { BackgroundEffectList } from '../../constants/settings';
import Select from 'react-select'
import { PlainBackground } from './BackgroundEffectsSettings/PlainBackground';
import { ColorLiquids } from './BackgroundEffectsSettings/ColorLiquids';
import { withSettingsContext } from '../../contexts/Settings';

const EffectSettingsMap = {
  colorLiquids: ColorLiquids,
  plainBackground: PlainBackground
}  

export const BackgroundEffects = withSettingsContext(
  class extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        currentEffect: undefined,
      };
      this.onChange = this.onChange.bind(this);
      this.updateBackgroundContext = this.updateBackgroundContext.bind(this);
    }

    // Use this function carefully
    static getDerivedStateFromProps(nextProps, prevState) {
      if (!prevState.currentEffect && nextProps.activeBackgroundEffectSettings) {
        return { currentEffect: nextProps.activeBackgroundEffectSettings.type };
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
      if (!this.props.activeBackgroundEffectSettings) {
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
          Select Effect
          <Select options={BackgroundEffectList} value={selectedOption} onChange={this.onChange}/>
          {/* here if the passProps is available that means its present in context
          and if it is undefined then you need to fetch config from API */}
          <CurrentSelectedSettings config={passProps} updateBackgroundContext={this.updateBackgroundContext}/>
        </React.Fragment>
      );
    }
  }
);