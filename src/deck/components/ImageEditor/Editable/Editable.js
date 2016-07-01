import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import {connect, Provider} from 'react-redux'
import {applyMiddleware, bindActionCreators, combineReducers, createStore, compose} from 'redux'
import * as saga from 'redux-saga'

import ReactMotion from 'react-motion'
import ReactMotionUi from 'react-motion-ui-pack'
import ReactTransitionGroup from 'react-addons-transition-group'
import { Paper, Popover, FloatingActionButton } from 'material-ui'

import {DraggableCore, ReactDraggable} from 'react-draggable'


class Editable extends Component {

  static propTypes = {

    width: PropTypes.number,
    height: PropTypes.number,
    absoluteUri: PropTypes.string

  }

  renderWithout () {

    const absoluteUri = this.props.absoluteUri
    const style = {
      width: this.props.width + 'px',
      height: this.props.height + 'px'
    }

    return (

      <img src={absoluteUri} style={style} />

    )

  }

  mkMask (style) {
    return style.union({
      position: relative
    })
  }

  processOpt(config) {

    if (config.at == 'vertices') {
      config.which.map(x => renderVertices(config.jsx, x))
    }

  }

  getVerticesStyle(which) {

    switch (which) {
      case 1:
            return {
              position: absolute,
              top: 0,
              right: 0
            }
      case 2:
            return {
              position: absolute,
              top: 0,
              left: 0
            }
      case 3:
            return {
              position: absolute,
              bottom: 0,
              left: 0
            }
      case 4:
            return {
              position: absolute,
              bottom: 0,
              right: 0
            }
    }

  }

  renderVertices (what, which) {
    const style = this.getVerticesStyle(which)
    return (
      <div style={style}>
        {what}
      </div>
    )
  }

  renderMask (maskStyle, opts) {

    const relativeStyle = this.mkMask(maskStyle)
    const extras = this.processOpt(opts)

    return (

      <div style={relativeStyle}>
        {this.renderWithout()}
        {extras.map(x => x)}
      </div>

    )

  }

}
