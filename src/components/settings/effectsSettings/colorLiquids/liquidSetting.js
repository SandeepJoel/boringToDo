import React from 'react';
import Select from 'react-select';
// TODO: If possible try to replace react-select with normal select
import { BtnColorPicker } from "../../../BtnColorPicker";
import { generateRandomString } from '../../../../utils/helpers';

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
    this.colorChange = this.colorChange.bind(this);
  }

  colorChange(data) {
    let colorKey = this.props.liquid.colors ? 'colors' : 'color';
    let colorVal = JSON.parse(JSON.stringify(this.props.liquid[colorKey]));
    colorVal[data.index] = data.color;

    this.props.updateLiquid({
      liquid: this.props.liquid.liquid,
      fill: this.props.liquid.fill,
      [colorKey]: colorVal,
    });
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
                { isGradient? `Color ${index + 1}:` : 'Color :'}
                <BtnColorPicker color={color} index={index} key={`${index}_${generateRandomString()}`} colorChange={this.colorChange}/>
              </div>
            )
          })
        }
      </section>
    )
  }
}