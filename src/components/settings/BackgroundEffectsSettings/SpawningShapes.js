import React from 'react';
import Select from 'react-select';
import { generateRandomString, deepClone, deepCompare } from '../../../utils/helpers';
import { BtnColorPicker } from "../../BtnColorPicker";
import { BgsActionsWrapper } from '../../../containers/BgsActionsWrapper';
import { customSelectStyles, customSelectTheme } from '../../../constants/styles';

const PositionList = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'center', label: 'Center' },
];

const SpawningShapes = BgsActionsWrapper(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.reset = this.reset.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    onSelectChange(name, data) {
      let { config, type: effectType } = deepClone(this.props.currentEffectConfig);
      config[name] = data.value;
      let nextState = {
        config,
        type: effectType
      };
      let isEqual = deepCompare(nextState, this.props.initialState);
      this.props.ourSetState({
        isDirty: !isEqual,
        currentEffectConfig: nextState
      })
    }

    handleChange(type, { color }) {
      let { config, type: effectType } = deepClone(this.props.currentEffectConfig);
      config[type] = color;
      let nextState = {
        config,
        type: effectType
      };
      let isEqual = deepCompare(nextState, this.props.initialState);
      this.props.ourSetState({
        isDirty: !isEqual,
        currentEffectConfig: nextState
      })
    };

    // TODO: Need to reduce duplicate code on all three functions

    reset() {
      this.props.ourSetState({
        currentEffectConfig: deepClone(this.props.initialState),
        isDirty: false
      })
    }

    render() {
      let { isDirty, currentEffectConfig, applyBtn } = this.props;
      let { config: { backgroundColor, particleColor, position} } = currentEffectConfig
      let selectedPosition = PositionList.find(x => x.value === position);
      return (
        <div className='setting-500 clearfix mt-30'>
          <div className='space-between-center mb-20'>
            <label> Particle Color </label>
            <BtnColorPicker
              color={particleColor} key={`${generateRandomString()}`} colorChange={this.handleChange.bind(this, 'particleColor')} />
          </div>
          <div className='space-between-center mb-20'>
            <label> Background Color </label>
            <BtnColorPicker
              color={backgroundColor} key={`${generateRandomString()}`} colorChange={this.handleChange.bind(this, 'backgroundColor')} />
          </div>
          <div className='space-between-center mb-20'>
            <label> Position </label>
            <Select name='position'
              options={PositionList}
              value={selectedPosition}
              onChange={this.onSelectChange.bind(this, 'position')}
              styles={customSelectStyles}
              theme={customSelectTheme} />
          </div>
          <section className="float-right">
            <button onClick={this.reset} disabled={!isDirty}>
              Reset
            </button>
            {applyBtn}
          </section>
        </div>
      )
    }
  }
);

export default SpawningShapes;
