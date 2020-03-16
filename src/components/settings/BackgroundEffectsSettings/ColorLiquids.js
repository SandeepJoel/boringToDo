import React from 'react';
import { 
  getBackgroundEffectFS,
  activateAndUpdateBackgroundEffectFS 
} from '../../../api/settingsFirestore';
import { getFromLocalStorage, generateRandomString, deepCompare } from '../../../utils/helpers';
import { Liquid } from './ColorLiquids/Liquid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO: Need to enable Airbnb style guide to make naming conventions better

const newLiquid = {
  colors: ['#FFF', '#000'],
  fill: "gradient",
  liquid: "blob1"
}

export class ColorLiquids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidIndex: 0,
      applyState: 'Done',
      isDirty: false,
      isLoaded: props.config ? true: false,
      currentEffectConfig: props.config,
      initialState: props.config ? JSON.parse(JSON.stringify(props.config)) : undefined
    };
    this.fetchBackgroundEffect = this.fetchBackgroundEffect.bind(this);
    this.apply = this.apply.bind(this);
    this.reset = this.reset.bind(this);
    this.selectLiquid = this.selectLiquid.bind(this);
    this.updateLiquid = this.updateLiquid.bind(this);
    this.addLiquid = this.addLiquid.bind(this);
    this.removeLiquid = this.removeLiquid.bind(this);
  }

  selectLiquid(index) {
    this.setState({
      liquidIndex: index
    });
  }

  removeLiquid() {
    this.setState((state, props) => {
      let nextState = {
        type: state.currentEffectConfig.type,
        config: [
          ...state.currentEffectConfig.config.slice(0, state.liquidIndex),
          ...state.currentEffectConfig.config.slice(state.liquidIndex + 1),
        ]
      }
      // TODO: Can we extract out deepComparing
      let isEqual = deepCompare(nextState, state.initialState);
      return {
        isDirty: !isEqual,
        currentEffectConfig: nextState,
        liquidIndex: (state.liquidIndex - 1)
      }
    })
  }

  addLiquid() {
    this.setState((state, props) => {
      let nextState = {
        type: state.currentEffectConfig.type,
        config: [...state.currentEffectConfig.config, newLiquid]
      }
      let isEqual = deepCompare(nextState, state.initialState);
      return {
        isDirty: !isEqual,
        currentEffectConfig: nextState,
        liquidIndex: (state.currentEffectConfig.config.length)
      }
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
      initialState: fetchedData // TODO: Is this okay to store an initial state like this ?
    });
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

    // TODO: Here we need to update both context and localStorage. Think to find a better way
    this.props.updateBackgroundContext({ activeBackgroundEffectSettings: payload });
    localStorage.setItem('activeBackgroundEffectSettings', JSON.stringify(payload));
  };

  reset() {
    this.setState((state) => {
      let {
        initialState,
        initialState: {
          config: initialStateConfig 
        },
        currentEffectConfig: {
          config: currentConfig
        }
      } = state;
      let hasLiquidIndexChanged = !(currentConfig.length === initialStateConfig.length);
      let newLiquidIndex = hasLiquidIndexChanged ? 0 : state.liquidIndex;
      return {
        currentEffectConfig: initialState,
        isDirty: false,
        liquidIndex: newLiquidIndex
      }
    })
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
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
    let { type, config: liquids } = currentEffectConfig;
    let notApplyable = this.props.activeEffect === type;
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
            
            <FontAwesomeIcon icon='plus-circle' size="lg" onClick={this.addLiquid.bind(this)}></FontAwesomeIcon>
              -----
            <FontAwesomeIcon icon='trash' size="lg" onClick={this.removeLiquid.bind(this)}></FontAwesomeIcon>
            
          </section>

          {liquidIndex !== undefined ? 
            <Liquid
              liquid={this.state.currentEffectConfig.config[liquidIndex]} 
              key={liquidIndex}
              initialData={this.state.initialState.config[liquidIndex]}
              updateLiquid={this.updateLiquid}
              /> : ''}        
        </div>
        <button onClick={this.apply} disabled={!isDirty && notApplyable}>
          {applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
        <button onClick={this.reset} disabled={!isDirty}>
          Reset
        </button>
      </React.Fragment>
    )
  }
}

