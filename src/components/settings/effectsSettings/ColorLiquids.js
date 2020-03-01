import React from 'react';
import { activateAndUpdateBackgroundEffectFS } from '../../../api/settingsFirestore';
import { getFromLocalStorage } from '../../../utils/helpers';
import { generateRandomString } from '../../../utils/helpers';
import { LiquidSetting } from './colorLiquids/liquidSetting';
// TODO: Need to enable Airbnb style guide to make naming conventions better

export class ColorLiquids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applyState: 'Done',
      waves: props.config.config,
      selectedWave: undefined,
      isDirty: false
    };
    this.selectWave = this.selectWave.bind(this);
    this.updateLiquid = this.updateLiquid.bind(this);
  }

  selectWave(index) {
    this.setState({ 
      selectedWave: this.props.config.config[index],
      waveIndex: index
    });
  }

  updateLiquid(data) {

  }

  async apply() {
    let payload = {
      // type: this.props.config.type,
    };
    this.setState({ applyState: 'Pending' });
    // update and activate
    await activateAndUpdateBackgroundEffectFS(
      getFromLocalStorage('userData', 'id'),
      this.props.config.type,
      payload
    );
    this.setState({ applyState: 'Done', isDirty: false });
    localStorage.setItem('settings', JSON.stringify({
      activeBackgroundEffect: payload,
      general: getFromLocalStorage('settings', 'general')
    }));
  };

  render() {
    let { waves, selectedWave, waveIndex, applyState, isDirty } = this.state; 
    console.log(selectedWave);
    return (
      <React.Fragment>
        <div className='flex'> 
          <section className="existing-waves">
            Existing Waves
            {
              waves.map((waveItem, index) => {
                let btnStyle = {
                  backgroundColor: waveItem.colors ? waveItem.colors[0] : waveItem.color
                }
                return (
                  <button
                    className={waveIndex === index ? 'selected': ''}
                    style={btnStyle}
                    onClick={this.selectWave.bind(this, index)}
                    key={`${index}_${generateRandomString()}`}>
                    {waveItem.wave}
                  </button>
                )
              })
            }
          </section>
          {selectedWave ? <LiquidSetting wave={selectedWave} key={waveIndex} updateLiquid={this.updateLiquid}/> : ''}        
        </div>
        <button onClick={this.apply} disabled={!isDirty}>
          {applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
      </React.Fragment>
    )
  }
}

