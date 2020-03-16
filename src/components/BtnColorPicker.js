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
    let colorBtn = <button style={{ backgroundColor: color }}> {color} </button>;
    return (
      <Popup trigger={colorBtn} position="right center" arrow={false} onClose={this.updateState}>
        <ChromePicker color={color} onChange={this.change} />
      </Popup>
    )
  }
}

