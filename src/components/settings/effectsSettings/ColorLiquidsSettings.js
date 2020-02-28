import React from 'react';
import Select from 'react-select'
import { ChromePicker } from 'react-color';
import { activateAndUpdateBackgroundEffectFS } from '../../../api/settingsFirestore';
import { getFromLocalStorage } from '../../../utils/helpers';
import { generateRandomString } from '../../../utils/helpers';

export class ColorLiquidsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applyState: 'Done',
      waves: props.config.config,
      selectedWave: undefined,
      isDirty: false
    };
    this.selectWave = this.selectWave.bind(this);
  }

  selectWave(index) {
    this.setState({ selectedWave: this.props.config.config[index] });
  }

  async apply() {
    let payload = {
      // type: this.props.config.type,
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
  };

  render() {
    let { waves } = this.state; 
    return (
      <div>
        Existing Waves
        <div>
          {
            waves && waves.map((waveItem, index) => {
              let btnStyle = {
                backgroundColor: waveItem.colors ? waveItem.colors[0] : waveItem.color
              }
              return (
                <button
                  style={btnStyle}
                  onClick={this.selectWave.bind(this, index)} 
                  key={`${index}_${generateRandomString()}`}>
                  {waveItem.wave}
                </button>
              )
            })
          }
        </div>
        {this.state.selectedWave ? <AddWave wave={this.state.selectedWave} /> : ''}
        <button onClick={this.apply} disabled={!this.state.isDirty}>
          {this.state.applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
      </div>
    )
  }
}

const WavesList = [
  { value: 'blob1', label: 'Blob 1' },
  { value: 'blob2', label: 'Blob 2' }
];

export class AddWave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wave: this.props.wave,
      displayColorPicker: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose() {
    this.setState({ displayColorPicker: false });
  };

  handleChange(color) {
    this.setState({ isDirty: true })
  };

  onSelectChange() {
    this.setState({ isDirty: true })
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
    let { wave } = this.state;
    console.log(wave);
    let selectedOption = WavesList.find(x => x.value === this.state.wave.value);
    let colors = wave.colors ? wave.colors : [wave.colors]
    let btnStyle = {
      backgroundColor: wave.colors ? wave.colors[0] : wave.color
    }
    return (
      <section className='add-wave'>
        <Select options={WavesList} value={selectedOption} onChange={this.onSelectChange} />
        {
          colors.map((color, index) => {
           return (
             <button style={btnStyle} key={index} onClick={this.handleClick}> {color} </button>
            )
          })
        }
        {
          // this.state.displayColorPicker ?
          //   <div style={popover}>
          //     <div style={cover} onClick={this.handleClose} />
          //     <ChromePicker color={this.state.currentColor} onChange={this.handleChange} />
          //   </div>
          //   :
          //   null
        }
      </section>
    )
  }
}

