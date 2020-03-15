import { ChromePicker } from 'react-color';
import React from 'react';
import { 
  getBackgroundEffectFS,
  activateAndUpdateBackgroundEffectFS
} from '../../../api/settingsFirestore';
import { getFromLocalStorage } from '../../../utils/helpers';

export class PlainBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      currentEffectConfig: props.config,
      applyState: 'Done',
      isDirty: false,
      isLoaded: props.config ? true: false,
      initialState: props.config ? JSON.parse(JSON.stringify(props.config)): undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.apply = this.apply.bind(this);
    this.reset = this.reset.bind(this);
    this.fetchBackgroundEffect = this.fetchBackgroundEffect.bind(this);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose() {
    this.setState({ displayColorPicker: false });
  };

  handleChange(color) {
    this.setState({
      currentEffectConfig: {
        color: color.hex,
        type: this.state.currentEffectConfig.type
      },
      isDirty: true 
    })
  };

  async fetchBackgroundEffect(effectId) {
    this.setState({
      isLoaded: false
    });
    let fetchedData = await getBackgroundEffectFS(
      getFromLocalStorage('userData', 'id'),
      effectId
    );
    this.setState({
      isLoaded: true,
      currentEffectConfig: fetchedData,
      initialState: fetchedData
    });
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.fetchBackgroundEffect('plainBackground');
    }
  }

  async apply() {
    let payload = this.state.currentEffectConfig;
    this.setState({ applyState: 'Pending' });
    // update and activate
    await activateAndUpdateBackgroundEffectFS(
      getFromLocalStorage('userData', 'id'),
      payload
    );
    this.setState({ applyState: 'Done', isDirty: false, initialState: payload });

    /* TODO: 
      Here we need to update both context and localStorage. Think to find a better way.
      If we feel that localStorage is not used that much, then we will need to remove it.
    */
    this.props.updateBackgroundContext({ activeBackgroundEffectSettings: payload });
    localStorage.setItem('activeBackgroundEffectSettings', JSON.stringify(payload));
  }

  reset() {
    this.setState({
      currentEffectConfig: this.state.initialState,
      isDirty: false
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <React.Fragment>
          Loading...
        </React.Fragment>
      );
    }
    let { isDirty, applyState, currentEffectConfig: {type, color}} = this.state;
    let notApplyable = this.props.activeEffect === type;
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
      backgroundColor: `${color}`
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
                <ChromePicker color={color} onChange={this.handleChange} />
              </div>
              :
              null
          }
        </div>        
        <button onClick={this.apply} disabled={!isDirty && notApplyable}>
          {applyState === 'Done' ? 'Apply' : 'Apply...'}
        </button>
        <button onClick={this.reset} disabled={!isDirty}>
          Reset
        </button>        
      </div>
    )
  }
}