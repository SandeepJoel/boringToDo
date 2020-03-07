import React from 'react';
import { withSettingsContext } from '../contexts/Settings';
import { ColorLiquids } from './Effects/ColorLiquids';
import { PlainBackground } from './Effects/PlainBackground';

const EffectsMap = {
  colorLiquids: ColorLiquids,
  plainBackground: PlainBackground
}  

export const Effect = withSettingsContext(
  class extends React.Component {
    constructor(props) {
      super(props);            
    }

    render() {
      if (!this.props.activeBackgroundEffectSettings) {
        return (
          <React.Fragment>
            "Loading...."
          </React.Fragment>
        )
      }
      let { 
        activeBackgroundEffectSettings, 
        activeBackgroundEffectSettings: { type }
      } = this.props;
      let CurrentEffect = EffectsMap[type];
      return (
        <React.Fragment>
          <CurrentEffect settings={activeBackgroundEffectSettings}/>          
        </React.Fragment>
      )
    }
  }
);