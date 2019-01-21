import React from 'react';
import { googleSignOut } from '../api/auth';

export const SettingsView = () => {
  return (
    <button onClick={googleSignOut}>Google Sign out</button>
  );
}