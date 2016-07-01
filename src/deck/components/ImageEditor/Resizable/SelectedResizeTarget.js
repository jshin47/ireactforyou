import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import {connect, Provider} from 'react-redux'
import {applyMiddleware, bindActionCreators, combineReducers, createStore, compose} from 'redux'
import * as saga from 'redux-saga'

import ReactMotion from 'react-motion'
import ReactMotionUi from 'react-motion-ui-pack'
import ReactTransitionGroup from 'react-addons-transition-group'
import { IconButton, SvgIcon, FontIcon, IconMenu } from 'material-ui'
import ZoomOutMapIcon from './ZoomOutMapIcon'
import {DraggableCore, ReactDraggable} from 'react-draggable'


class SelectedResizeTarget extends Component {

  static propTypes = {

    selection: PropTypes.any

  }

  handle (ev) {

  }

  render () {

    let onStart = onDrag = onStop = this.handle

    const jsx =
    (
      <DraggableCore onStart={onStart} onDrag={onDrag} onStop={onStop}>
        <ZoomOutMapIcon onclick={enableResizing} />
      </DraggableCore>
    )

    const renderOpts = {
      jsx,
      at: 'vertices',
      which: [2, 4]
    }

    selection.renderMask({}, [renderOpts])

  }

}
