import React from 'react';
import Popup from "reactjs-popup";
import { ChromePicker } from 'react-color';
import { getCSSVar } from '../utils/helpers';

// TODO: Need to move color styles to purely css
const PopupStyle = {
  background: getCSSVar('--secondary-background'),
  border: 'none',
  boxShadow: getCSSVar('--box-shadow-200'),
  borderRadius: 4,
  width: 'auto'
};

export class BtnColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color
    };
    this.change = this.change.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  change(color) {
    this.setState({
      color: color.hex
    })
  }

  updateState() {
    this.props.colorChange({
      color: this.state.color,
    })
  }

  render() {
    let { color } = this.state;
    let colorBtn = <button className='liquid-box' style={{ backgroundColor: color }}> {color} </button>;
    return (
      <Popup 
        trigger={colorBtn} 
        position="right center"
        arrow={false}
        onClose={this.updateState}
        contentStyle={PopupStyle} >
        <ChromePicker color={color} className='colorpicker-container' onChange={this.change} />
      </Popup>
    )
  }
}

