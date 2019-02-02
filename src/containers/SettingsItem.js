import React from 'react';
import { Todo } from '../components/settings/Todo';
import { AnimationWidget } from '../components/settings/AnimationWidget';
import { Backgrounds } from '../components/settings/Backgrounds';
import { General } from '../components/settings/General';

export const SettingsItem = (props) => {
  const ComponentsNameMap = {
    todo: Todo,
    animationWidget: AnimationWidget,
    backgrounds: Backgrounds,
    general: General
  }
  // we are setting general setting as default 
  let ComponentName = ComponentsNameMap[props.name || "general"]
  return (
    <ComponentName/>
  );
};