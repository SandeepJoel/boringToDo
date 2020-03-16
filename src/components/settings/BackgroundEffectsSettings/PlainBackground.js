import React from 'react';
import { 
  getBackgroundEffectFS,
  activateAndUpdateBackgroundEffectFS
} from '../../../api/settingsFirestore';
import { getFromLocalStorage, generateRandomString } from '../../../utils/helpers';
import { BtnColorPicker } from "../../BtnColorPicker";

export class PlainBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applyState: 'Done',
      isDirty: false,
      isLoaded: props.config ? true: false,
      currentEffectConfig: props.config,
      initialState: props.config ? JSON.parse(JSON.stringify(props.config)): undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.apply = this.apply.bind(this);
    this.reset = this.reset.bind(this);
    this.fetchBackgroundEffect = this.fetchBackgroundEffect.bind(this);
  }


  handleChange({color}) {
    this.setState({
      currentEffectConfig: {
        color,
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

    return (
      <div>
        Choose a plain color
        <div>
          <BtnColorPicker 
            color={color} key={`${generateRandomString()}`} colorChange={this.handleChange} />          
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