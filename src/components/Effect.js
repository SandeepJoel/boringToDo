import React from 'react';
import { withSettingsContext } from '../contexts/Settings';
import { Loader } from '../components/Loader';
import Loadable from 'react-loadable';

const EffectsMap = {
  colorLiquids: Loadable({
    loader: () => import('./Effects/ColorLiquids'),
    loading: Loader,
    delay: 500,
  }),
  plainBackground: Loadable({
    loader: () => import('./Effects/PlainBackground'),
    loading: Loader,
    delay: 500,
  })
}  

export const Effect = withSettingsContext(
  class extends React.Component {
    constructor(props) {
      super(props);            
    }

    render() {
      if (!this.props.activeBackgroundEffectSettings) {
        return (
          <Loader type='simple'/>
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