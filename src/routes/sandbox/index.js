
import React from 'react';
import SandboxPage from './../../components/SandboxPage'
import Sandbox from './Sandbox';

export const path = '/sandbox';
export const action = async (state) => {
  const title = 'Sandbox';
  state.context.onSetTitle(title);
  return <SandboxPage title={title} />;
};
