import React from 'react';
import { BackgroundEffectList } from '../../constants/settings';
import Select from 'react-select'
import { getBackgroundEffectFS } from '../../api/settingsFirestore';
import { getFromLocalStorage } from '../../utils/helpers';
import { PlainBackgroundSettings } from './effectsSettings/PlainBackgroundSettings';
import { ColorLiquidsSettings } from './effectsSettings/ColorLiquidsSettings';

const EffectSettingsMap = {
  colorLiquids: ColorLiquidsSettings,
  plainBackground: PlainBackgroundSettings
}  

export class BackgroundEffects extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentEffect: props.selectedConfig.type,
      isLoaded: true,
      currentEffectConfig: {}
    };
    this.onChange = this.onChange.bind(this);
    this.fetchBackgroundEffect = this.fetchBackgroundEffect.bind(this);
  }

  async fetchBackgroundEffect(effectId) {
    this.setState({
      isLoaded: false
    });    
    let fetchedData = await getBackgroundEffectFS(
      getFromLocalStorage('userData', 'id'),
      effectId
    );
    this.setState({
      isLoaded: true,
      currentEffectConfig: fetchedData
    });
  }

  onChange(option) {
    this.fetchBackgroundEffect(option.value);
    this.setState({
      currentEffect: BackgroundEffectList.find(x => x.value === option.value).value
    })
  }

  render() {
    let selectedOption = BackgroundEffectList.find(x => x.value === this.state.currentEffect);
    let CurrentSelectedSettings = EffectSettingsMap[this.state.currentEffect];
    return (
      <div>
        Select Effect
        <Select options={BackgroundEffectList} value={selectedOption} onChange={this.onChange}/>
        { 
          this.state.isLoaded ? 
            (this.props.selectedConfig.type === this.state.currentEffect) ?
              <CurrentSelectedSettings config={this.props.selectedConfig} />
              :
              <CurrentSelectedSettings config={this.state.currentEffectConfig} />
          :
          'Loading...' 
        }
      </div>
    );
  }  
};