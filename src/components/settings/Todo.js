import React from 'react';
import { TwitterPicker } from 'react-color';
export class Todo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      color: '#1abc9c',
    };
    this.colorsArray = [ 
      '#D9E3F0',
      '#F47373',
      '#697689', 
      '#1abc9c'
    ]
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }  

  handleChangeComplete (color) {
    let colorHexVal = color.hex;
    this.setState({ color: colorHexVal });
    this.props.todoFunctions.setPrimaryColor(colorHexVal)
  };

  render() {
    return (
      <div>
        <h1>Todo</h1>
        <label>Primary color type: </label> 
        <input type='radio' id="solid" name="todo-primary-color-option"/> <label htmlFor="solid">Solid</label>
        <input type='radio' id="gradient" name="todo-primary-color-option"/> <label htmlFor="gradient">Gradient</label>
        <br></br>
        Primary color:
        <TwitterPicker
          triangle = "hide"
          color = { this.state.color }
          colors= { this.colorsArray }
          onChangeComplete = { this.handleChangeComplete }
        />
      </div>     
    );
  }
}