import React from 'react';
import {
  getBackgroundEffectFS,
  activateAndUpdateBackgroundEffectFS
} from '../api/settingsFirestore';
import { getFromLocalStorage } from '../utils/helpers';
import { Loader } from '../components/Loader';

// TODO: Need to enable Airbnb style guide to make naming conventions better

export const BgsActionsWrapper = (PassedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        applyState: 'Done',
        isDirty: false,
        isLoaded: props.config ? true : false,
        currentEffectConfig: props.config,
        initialState: props.config ? JSON.parse(JSON.stringify(props.config)) : undefined
      };
      this.fetchBackgroundEffect = this.fetchBackgroundEffect.bind(this);
      this.ourSetState = this.ourSetState.bind(this);
      this.apply = this.apply.bind(this);
    }

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

    async apply() {
      let payload = this.state.currentEffectConfig;
      this.setState({ applyState: 'Pending' });
      // update and activate
      await activateAndUpdateBackgroundEffectFS(
        getFromLocalStorage('userData', 'id'),
        payload
      );
      this.setState({ applyState: 'Done', isDirty: false, initialState: payload });

      // TODO: Here we need to update both context and localStorage. Think to find a better way
      this.props.updateBackgroundContext({ activeBackgroundEffectSettings: payload });
      localStorage.setItem('activeBackgroundEffectSettings', JSON.stringify(payload));
    };

    ourSetState(stateData) {
      this.setState(stateData)
    }

    componentDidMount() {
      if (!this.state.isLoaded) {
        this.fetchBackgroundEffect(this.props.currentEffect);
      }
    }

    render() {
      let { applyState, isDirty, currentEffectConfig } = this.state;
      if (!currentEffectConfig) {
        return (
          <Loader type='simple' />
        )
      }
      let { type } = currentEffectConfig;
      let notApplyable = this.props.activeEffect === type;
      let applyBtn = <button onClick={this.apply} disabled={!isDirty && notApplyable}>
        {applyState === 'Done' ? 'Apply' : 'Apply...'}
      </button>;
      return (
        <React.Fragment>
          <PassedComponent ourSetState={this.ourSetState} applyBtn={applyBtn} {...this.state} {...this.props}/>
        </React.Fragment>
      )
    }
  }
}

