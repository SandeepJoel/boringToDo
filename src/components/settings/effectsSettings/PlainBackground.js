import { ChromePicker } from 'react-color';
import React from 'react';
import { activateAndUpdateBackgroundEffectFS } from '../../../api/settingsFirestore';
import { getFromLocalStorage } from '../../../utils/helpers';

export class PlainBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      currentColor: this.props.config.color,
      applyState: 'Done',
      isDirty: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.apply = this.apply.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose() {
    this.setState({ displayColorPicker: false });
  };

  handleChange(color) {
    this.setState({ currentColor: color.hex, isDirty: true })
  };

  async apply() {
    let payload = {
      color: this.state.currentColor,
      type: this.props.config.type,
    };
    this.setState({ applyState: 'Pending' });
    // update and activate
    await activateAndUpdateBackgroundEffectFS(
      getFromLocalStorage('userData', 'id'),
      this.props.config.type,
      payload
    );
    this.setState({ applyState: 'Done', isDirty: false });
    localStorage.setItem('settings', JSON.stringify({
      activeBackgroundEffect: payload,
      general: getFromLocalStorage('settings', 'general')
    }));

    localStorage.setItem('activeBackgroundEffect', JSON.stringify(payload));

  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    const button = {
      backgroundColor: `${this.state.currentColor}`
    }
    return (
      <div>
        Choose a plain color
        <div>
          <button style={button} onClick={this.handleClick}></button>
          {
            this.state.displayColorPicker ?
              <div style={popover}>
                <div style={cover} onClick={this.handleClose} />
                <ChromePicker color={this.state.currentColor} onChange={this.handleChange} />
              </div>
              :
              null
          }
        </div>
        <button onClick={this.apply} disabled={!this.state.isDirty}>
          {this.state.applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
      </div>
    )
  }
}