import React from 'react';
import { generateRandomString } from '../../../utils/helpers';
import { BtnColorPicker } from "../../BtnColorPicker";
import { BgsActionsWrapper } from '../../../containers/BgsActionsWrapper';

export const PlainBackground = BgsActionsWrapper(
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
      if (!this.props.isLoaded) {
        return (
          <React.Fragment>
            Loading...
          </React.Fragment>
        );
      }
      let { isDirty, currentEffectConfig: {color}} = this.props;
      return (
        <React.Fragment>
          Choose a plain color          
          <BtnColorPicker 
            color={color} key={`${generateRandomString()}`} colorChange={this.handleChange} />
          <br />
          <button onClick={this.reset} disabled={!isDirty}>
            Reset
          </button>        
        </React.Fragment>
      )
    }
  }
);