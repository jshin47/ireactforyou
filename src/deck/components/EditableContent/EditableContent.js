import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import {connect, Provider} from 'react-redux'
import {applyMiddleware, bindActionCreators, combineReducers, createStore, compose} from 'redux'
import * as saga from 'redux-saga'

import ReactMotion from 'react-motion'
import ReactMotionUi from 'react-motion-ui-pack'
import ReactTransitionGroup from 'react-addons-transition-group'
import { Card } from 'material-ui/Card/Card'

import * as live from '../../actions/live'

export default class EditableContent<M> extends Component {
  
  static propTypes = M
  
  
  
  render () {
    
    return (
      
      
      
    )
    
  }
  
}


// class ComponentTemplate extends Component
