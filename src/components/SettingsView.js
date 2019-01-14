import React from 'react';
import { googleSignOut } from '../config/firestoreConfig';

export const SettingsView = () => {
  return (
    <button onClick={googleSignOut}>Google Sign out</button>
  );
}