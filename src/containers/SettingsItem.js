import React from 'react';
import { BackgroundEffects } from '../components/settings/BackgroundEffects';
import { General } from '../components/settings/General';
import { withUserContext } from '../components/UserLoginSignup';

export const SettingsItem = withUserContext(
  (props) => {
    const ComponentsNameMap = {
      BackgroundEffects,
      General
    }
    // we are setting general setting as default 
    let ComponentName = ComponentsNameMap[props.name]
    
    return (
      <ComponentName {...props} />
    );
  }
)