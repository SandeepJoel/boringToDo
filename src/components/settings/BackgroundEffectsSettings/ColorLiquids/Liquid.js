import React from 'react';
import Select from 'react-select';
import { BtnColorPicker } from "../../../BtnColorPicker";
import { generateRandomString } from '../../../../utils/helpers';
import { customSelectStyles } from '../../../../constants/styles';

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

export class Liquid extends React.Component {
  constructor(props) {
    super(props);
    this.colorChange = this.colorChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  colorChange(colorIndex, data) {
    let colorKey = this.props.liquid.colors ? 'colors' : 'color';
    let colorVal;
    if (colorKey === 'colors') {
      colorVal = JSON.parse(JSON.stringify(this.props.liquid[colorKey]))
      colorVal[colorIndex] = data.color;
    } else {
      colorVal = data.color
    }
    this.props.updateLiquid({
      liquid: this.props.liquid.liquid,
      fill: this.props.liquid.fill,
      [colorKey]: colorVal,
    });
  };
    
  onSelectChange(name, data) {
    let colorKey, colorVal;
    switch (name) {
      case 'liquidType':
        colorKey = this.props.liquid.fill === 'gradient' ? 'colors' : 'color';
        this.props.updateLiquid({
          liquid: data.value,
          fill: this.props.liquid.fill,
          [colorKey]: this.props.liquid[colorKey],
        });
      break;

      case 'fillType':
        colorKey = data.value === 'gradient' ? 'colors' : 'color';
        colorVal = this.props.initialData && this.props.initialData[colorKey];
        if (!colorVal) {
          colorVal = data.value === 'gradient' ? DefaultValues.gradient : DefaultValues.fill;
        }    
        this.props.updateLiquid({
          liquid: this.props.liquid.liquid,
          fill: data.value,
          [colorKey]: colorVal,
        });     
      break;
    }
  };

  render() {
    let { liquid } = this.props;
    if (!liquid) {
      return (
        <React.Fragment>
          Loading view...
        </React.Fragment>
      )
    }
    let isGradient = (liquid.fill === 'gradient'); 
    let selectedLiquidOption = LiquidsList.find(x => x.value === liquid.liquid);
    let selectedFillOption = FillList.find(x => x.value === liquid.fill);
    let colors = liquid.colors ? liquid.colors : [liquid.color]
    return (
      <section className='liquid-setting p-10'>
        <div className='space-between-center mb-10'>
          <label> Liquid Type </label>
          <Select name='liquidType'
            options={LiquidsList}
            value={selectedLiquidOption}
            onChange={this.onSelectChange.bind(this, 'liquidType')}
            styles={customSelectStyles} />
        </div>
        <div className='space-between-center mb-10'>
          <label> Fill Type </label>
          <Select name='fillType'
            options={FillList}
            value={selectedFillOption}
            onChange={this.onSelectChange.bind(this, 'fillType')}
            styles={customSelectStyles} />
        </div>
        {
          colors.map((color, index) => {
            return (
              <BtnColorPicker color={color} key={`${index}_${generateRandomString()}`} colorChange={this.colorChange.bind(this, index)}/>
            )
          })
        }
      </section>
    )
  }
}