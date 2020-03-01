import React from 'react';
import Select from 'react-select'
// TODO: If possible try to replace react-select with normal select
import { ChromePicker } from 'react-color';

const WavesList = [
  { value: 'blob1', label: 'Blob 1' },
  { value: 'blob2', label: 'Blob 2' }
];

const FillList = [
  { value: 'singleColor', label: 'Single Color' },
  { value: 'gradient', label: 'Gradient' }
];

export class LiquidSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleChange(e) {    
  };

  onSelectChange(data) {
    let { name } = this;
    switch (name) {
      case 'waveType':
        let colorKey = this.props.type === 'gradient' ? 'color' : 'colors';
        this.props.updateLiquid({
          wave: data.value,
          type: this.props.type,
          [colorKey]: this.props[colorKey]
        });
      break;
      case 'fillType':
      break;
    }
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
    let { wave } = this.props;
    let isGradient = (wave.type === 'gradient'); 
    let selectedWaveOption = WavesList.find(x => x.value === wave.wave);
    let selectedFillOption = FillList.find(x => x.value === wave.type);
    let colors = wave.colors ? wave.colors : [wave.color]
    return (
      <section className='add-wave'>
        <div className='field'>
          Wave Type: 
          <Select name='waveType' options={WavesList} value={selectedWaveOption} onChange={this.onSelectChange} />
        </div>
        <div className='field'>
          Fill Type:
          <Select name='fillType' options={FillList} value={selectedFillOption} onChange={this.onSelectChange} />
        </div>
        {
          colors.map((color, index) => {
            return (
              <div key={index}>
                {isGradient ? `Color ${index + 1}:` : 'Color :'}
                <button style={{ backgroundColor: color }} onClick={this.handleClick}> {color} </button>
              </div>
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