import React from 'react';
import { generateRandomString, deepCompare } from '../../../utils/helpers';
import { Liquid } from './ColorLiquids/Liquid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BgsActionsWrapper } from '../../../containers/BgsActionsWrapper';
// TODO: Need to enable Airbnb style guide to make naming conventions better

const newLiquid = {
  colors: ['#FFF', '#000'],
  fill: "gradient",
  liquid: "blob1"
}

export const ColorLiquids = BgsActionsWrapper(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        liquidIndex: 0,
      };
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
      let { currentEffectConfig: { config, type }, initialState } = this.props;
      let { liquidIndex } = this.state;
      let nextState = {
        type,
        config: [
          ...config.slice(0, liquidIndex),
          ...config.slice(liquidIndex + 1),
        ]
      }
      // TODO: Can we extract out deepComparing
      let isEqual = deepCompare(nextState, initialState);
      this.props.ourSetState({
        isDirty: !isEqual,
        currentEffectConfig: nextState,
      });
      this.setState({
        liquidIndex: (liquidIndex - 1)
      })
    }

    addLiquid() {
      let { currentEffectConfig: { config, type }, initialState } = this.props;
      let nextState = {
        type,
        config: [...config, newLiquid]
      }
      let isEqual = deepCompare(nextState, initialState);
      // updating state for HOC component
      this.props.ourSetState({
        isDirty: !isEqual,
        currentEffectConfig: nextState,
      });
      
      // updating state for current component
      // TODO: Verify whether this is fine 
      this.setState({
        liquidIndex: (config.length)
      })
    }

    updateLiquid(payload) {
      let { currentEffectConfig: { config, type }, initialState } = this.props;
      let { liquidIndex } = this.state;
      // TODO: Check is this current way of changing state for a large object is fine
      let nextState = {
        type,
        config: [
          ...config.slice(0, liquidIndex),
          payload,
          ...config.slice(liquidIndex + 1)
        ],
      }
      let isEqual = deepCompare(nextState, initialState);
      this.props.ourSetState({
        isDirty: !isEqual,
        currentEffectConfig: nextState
      })
    } 


    reset() {
      let {
        initialState,
        initialState: {
          config: initialStateConfig
        },
        currentEffectConfig: {
          config: currentConfig
        }
      } = this.props;
      let { liquidIndex } = this.state;
      let hasLiquidIndexChanged = !(currentConfig.length === initialStateConfig.length);
      let newLiquidIndex = hasLiquidIndexChanged ? 0 : liquidIndex;

      this.props.ourSetState({
        currentEffectConfig: initialState,
        isDirty: false,
      });

      this.setState({
        liquidIndex: newLiquidIndex
      })
    }


    render() {
      let { liquidIndex } = this.state;
      let { currentEffectConfig, initialState, isDirty } = this.props;
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
              
              <FontAwesomeIcon icon='plus-circle' size="lg" onClick={this.addLiquid.bind(this)}></FontAwesomeIcon>
                -----
              <FontAwesomeIcon icon='trash' size="lg" onClick={this.removeLiquid.bind(this)}></FontAwesomeIcon>
              
            </section>

            {liquidIndex !== undefined ? 
              <Liquid
                liquid={currentEffectConfig.config[liquidIndex]} 
                key={liquidIndex}
                initialData={initialState.config[liquidIndex]}
                updateLiquid={this.updateLiquid}
                /> : ''}        
          </div>
          <button onClick={this.reset} disabled={!isDirty}>
            Reset
          </button>
        </React.Fragment>
      )
    }
  }
);
