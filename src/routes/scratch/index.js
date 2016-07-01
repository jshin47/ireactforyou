import React from 'react';
import ReactPres from 'react-presentation'

import slides from './slides'

export const path = '/';

export const action = async (state) => {

  state.context.onSetTitle('Presentation by justin');
  return (
    <slides />
  )
};
