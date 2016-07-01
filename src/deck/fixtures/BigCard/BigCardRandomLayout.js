import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import {connect, Provider} from 'react-redux'
import {applyMiddleware, bindActionCreators, combineReducers, createStore, compose} from 'redux'
import * as saga from 'redux-saga'
import extend from 'extend'
import ReactMotion from 'react-motion'
import ReactMotionUi from 'react-motion-ui-pack'
import ReactTransitionGroup from 'react-addons-transition-group'
import { IconButton, SvgIcon, FontIcon, IconMenu } from 'material-ui'

class BigCardRandomLayout {
  
  getTitlePlacement = (title) => {
    return (s) => extend(s,{
      position: absolute,
      marginLeft: auto,
      marginRight: auto,
      display: inlineBlock
    })
  }
  
  getUpdatePlacement = (update) => {
    return s => s
  }
  
}
