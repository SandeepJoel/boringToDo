import React from 'react';
import { BackgroundEffects } from '../components/settings/BackgroundEffects';
import { General } from '../components/settings/General';

export const SettingsItem = (props) => {
  // TODO: Late check on how to not use this map ?
  const ComponentsNameMap = {
    activeBackgroundEffect: BackgroundEffects,
    general: General
  }  
  const ComponentName = ComponentsNameMap[props.name]
  
  return (
    <ComponentName {...props} />
  );
}