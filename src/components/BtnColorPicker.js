import React from 'react';
import Popup from "reactjs-popup";
import { ChromePicker } from 'react-color';

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
    let colorBtn = 
      <button className='liquid-box' style={{ backgroundColor: color }}> 
        {/* uncomment this once you make the below text visible based on background  */}
        {/* <span> {color} </span> */}
      </button>;
    return (
      <Popup 
        trigger={colorBtn} 
        position="right center"
        arrow={false}
        onClose={this.updateState}
        >
        <ChromePicker color={color} className='colorpicker-container' onChange={this.change} />
      </Popup>
    )
  }
}

