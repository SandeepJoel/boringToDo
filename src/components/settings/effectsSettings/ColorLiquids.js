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
      liquids: props.config.config,
      selectedLiquid: undefined,
      isDirty: false
    };
    this.selectLiquid = this.selectLiquid.bind(this);
    this.updateLiquid = this.updateLiquid.bind(this);
  }

  selectLiquid(index) {
    this.setState({ 
      selectedLiquid: this.props.config.config[index],
      liquidIndex: index
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
    let { liquids, selectedLiquid, liquidIndex, applyState, isDirty } = this.state; 
    console.log(selectedLiquid);
    return (
      <React.Fragment>
        <div className='flex'> 
          <section className="existing-liquids">
            Existing Liquids
            {
              liquids.map((liquidItem, index) => {
                let btnStyle = {
                  backgroundColor: liquidItem.colors ? liquidItem.colors[0] : liquidItem.color
                }
                return (
                  <button
                    className={liquidIndex === index ? 'selected': ''}
                    style={btnStyle}
                    onClick={this.selectLiquid.bind(this, index)}
                    key={`${index}_${generateRandomString()}`}>
                    {liquidItem.liquid}
                  </button>
                )
              })
            }
          </section>
          {selectedLiquid ? <LiquidSetting liquid={selectedLiquid} key={liquidIndex} updateLiquid={this.updateLiquid}/> : ''}        
        </div>
        <button onClick={this.apply} disabled={!isDirty}>
          {applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
      </React.Fragment>
    )
  }
}

