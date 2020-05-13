import React from 'react';
import { generateRandomString } from '../../../utils/helpers';
import { BtnColorPicker } from "../../BtnColorPicker";
import { BgsActionsWrapper } from '../../../containers/BgsActionsWrapper';

const PlainBackground = BgsActionsWrapper(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.reset = this.reset.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({color}) {
      this.props.ourSetState({
        currentEffectConfig: {
          color,
          type: this.props.currentEffectConfig.type
        },
        isDirty: true 
      })
    };

    reset() {
      this.props.ourSetState({
        currentEffectConfig: this.props.initialState,
        isDirty: false
      })
    }

    render() {
      let { isDirty, currentEffectConfig: { color }, applyBtn} = this.props;
      return (
        <div className='setting-500 clearfix mt-50'>
          <div className='space-between-center mb-20'>
            <label> Choose a plain color for background </label>
            <BtnColorPicker 
              color={color} key={`${generateRandomString()}`} colorChange={this.handleChange} />
          </div>
          <section className="float-right">
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

export default PlainBackground;
