import React from 'react';
import { BackgroundEffectList } from '../../constants/settings';
import Select from 'react-select'


export class BackgroundEffects extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentEffect: props.config.type
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(option) {
    this.setState({
      currentEffect: BackgroundEffectList.find(x => x.label === option.label)
    })
  }

  render() {
    let selectedOption = BackgroundEffectList.find(x => x.value === this.state.currentEffect)
    return (
      <div>
        Select Effect
        <Select options={BackgroundEffectList} value={selectedOption} onChange={this.onChange}/>
      </div>
    );
  }  
};