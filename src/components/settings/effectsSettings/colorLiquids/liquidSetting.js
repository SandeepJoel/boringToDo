import React from 'react';
import Select from 'react-select'
// TODO: If possible try to replace react-select with normal select
import { ChromePicker } from 'react-color';

const DefaultValues = {
  gradient: ['#000', '#FFF'],
  fill: '#FF0'
}
const LiquidsList = [
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
    let colorKey, colorVal;
    // Is this function correct ? Am I using `selectProps` currectly ?
    switch (name) {
      case 'liquidType':
        colorKey = this.selectProps.liquid.fill === 'gradient' ? 'colors' : 'color';
        this.selectProps.updateLiquid({
          liquid: data.value,
          fill: this.selectProps.liquid.fill,
          [colorKey]: this.selectProps.liquid[colorKey],
        });
      break;

      case 'fillType':
        colorKey = data.value === 'gradient' ? 'colors' : 'color';
        colorVal = this.selectProps.initialData[colorKey];
        if (!colorVal) {
          colorVal = data.value === 'gradient' ? DefaultValues.gradient : DefaultValues.fill ;
        }        
        this.selectProps.updateLiquid({
          liquid: this.selectProps.liquid.liquid,
          fill: data.value,
          [colorKey]: colorVal,
        });     
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
    let { liquid } = this.props;
    let isGradient = (liquid.fill === 'gradient'); 
    let selectedLiquidOption = LiquidsList.find(x => x.value === liquid.liquid);
    let selectedFillOption = FillList.find(x => x.value === liquid.fill);
    let colors = liquid.colors ? liquid.colors : [liquid.color]
    return (
      <section className='liquid-setting'>
        <div className='field'>
          Liquid Type: 
          <Select name='liquidType' options={LiquidsList} value={selectedLiquidOption} onChange={this.onSelectChange} selectProps={this.props} />
        </div>
        <div className='field'>
          Fill Type:
          <Select name='fillType' options={FillList} value={selectedFillOption} onChange={this.onSelectChange} selectProps={this.props} />
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