import React from 'react';
import { 
  getBackgroundEffectFS,
  activateAndUpdateBackgroundEffectFS 
} from '../../../api/settingsFirestore';
import { getFromLocalStorage, generateRandomString, deepCompare } from '../../../utils/helpers';
import { LiquidSetting } from './colorLiquids/liquidSetting';
// TODO: Need to enable Airbnb style guide to make naming conventions better

export class ColorLiquids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applyState: 'Done',
      isDirty: false,
      isLoaded: false,
      liquidIndex: 0,
      // TODO: Check dervied state here
      currentEffectConfig: this.props.config,
      initialState: JSON.parse(JSON.stringify(this.props.config))
    };
    this.fetchBackgroundEffect = this.fetchBackgroundEffect.bind(this);
    this.apply = this.apply.bind(this);
    this.reset = this.reset.bind(this);
    this.selectLiquid = this.selectLiquid.bind(this);
    this.updateLiquid = this.updateLiquid.bind(this);
  }

  selectLiquid(index) {
    this.setState({
      liquidIndex: index
    });
  }

  updateLiquid(payload) {
    // TODO: Check is this current way of changing state for a large object is fine
    let nextState = {
      type: this.state.currentEffectConfig.type,
      config: [
        ...this.state.currentEffectConfig.config.slice(0, this.state.liquidIndex),
        payload,
        ...this.state.currentEffectConfig.config.slice(this.state.liquidIndex + 1)
      ],
    }
    let isEqual = deepCompare(nextState, this.state.initialState);
    this.setState({
      isDirty: !isEqual,
      currentEffectConfig: nextState
    })
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
      currentEffectConfig: fetchedData,
      initialState: fetchedData
    });
    // TODO is this okay to store an initial state like this ?
  }

  async apply() {
    let payload = this.state.currentEffectConfig;
    this.setState({ applyState: 'Pending' });
    // update and activate
    await activateAndUpdateBackgroundEffectFS(
      getFromLocalStorage('userData', 'id'),
      payload
    );
    this.setState({ applyState: 'Done', isDirty: false, initialState: payload });    
    localStorage.setItem('settings', JSON.stringify({
      activeBackgroundEffect: payload,
      general: getFromLocalStorage('settings', 'general')
    }));
  };

  reset() {
    this.setState({
      currentEffectConfig: this.state.initialState,
      isDirty: false
    })
  }

  componentDidMount() {
    if (!this.state.currentEffectConfig) {
      this.fetchBackgroundEffect('colorLiquids');
    }
  }

  render() {
    let { liquidIndex, applyState, isDirty, currentEffectConfig } = this.state;     
    if (!currentEffectConfig) {
      return (
        <React.Fragment>
          Loading liquids...
        </React.Fragment>
      )
    }
    let { config: liquids } = currentEffectConfig;
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
          {liquidIndex !== undefined ? 
            <LiquidSetting 
              liquid={this.state.currentEffectConfig.config[liquidIndex]} 
              key={liquidIndex}
              initialData={this.state.initialState.config[liquidIndex]}
              updateLiquid={this.updateLiquid}
              /> : ''}        
        </div>
        <button onClick={this.apply} disabled={!isDirty}>
          {applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
        <button onClick={this.reset} disabled={!isDirty}>
          Reset
        </button>
      </React.Fragment>
    )
  }
}

