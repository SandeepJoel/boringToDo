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

const ColorLiquids = BgsActionsWrapper(
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
      let { currentEffectConfig, initialState, isDirty, applyBtn } = this.props;
      let { config: liquids } = currentEffectConfig;
      return (
        <div className='setting-fluid flex-wrap clearfix m-30 mt-50'> 
          <section className="existing-liquids pt-20 pl-20 pr-20">
            <h2>Existing Liquids</h2>
            <span>
              <button className='normal' onClick={this.addLiquid.bind(this)}>New</button>
              <button className='normal' onClick={this.removeLiquid.bind(this)}>Delete</button>
            </span>
            <div className='flex-wrap justify-content-center mt-15'>
              {
                liquids.map((liquidItem, index) => {
                  let isGradient = liquidItem.colors ? true: false;
                  let btnStyle;
                  if(isGradient) {
                    btnStyle = {
                      backgroundImage: `linear-gradient(to right, ${liquidItem.colors[0]}, ${liquidItem.colors[1]})`
                    }
                  } else {
                    btnStyle = {
                      backgroundColor: liquidItem.color
                    }
                  }
                  return (
                    <div
                      className={`liquid-box ${liquidIndex === index ? 'selected': ''}`}
                      style={btnStyle}
                      onClick={this.selectLiquid.bind(this, index)}
                      key={`${index}_${generateRandomString()}`}>
                    </div>
                  )
                })
              }
            </div>          
          </section>
          <div className='divider mt-25'></div>
          {liquidIndex !== undefined ? 
            <Liquid
              liquid={currentEffectConfig.config[liquidIndex]} 
              key={liquidIndex}
              initialData={initialState.config[liquidIndex]}
              updateLiquid={this.updateLiquid}
              /> : ''}
          <section className='margin-left-auto mb-20 mr-20'>
            <button className='danger' onClick={this.reset} disabled={!isDirty}>
              Reset
            </button>
            {applyBtn}
          </section>
        </div>
      )
    }
  }
);


export default ColorLiquids;