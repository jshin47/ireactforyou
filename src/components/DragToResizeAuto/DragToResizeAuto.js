// @flow

import {default as React, PropTypes} from 'react'
import {DragToResize} from './../DragToResize/DragToResize'

type State = {
  w: number,
  h: number,
  aspectRatio: number
}

type Size = {
  w: number,
  h: number
}

type ResizeData = {
  element: Element,
  size: Size
}

export default class DragToResizeAuto extends React.Component {

  static propTypes = {
    w: PropTypes.number,
    h: PropTypes.number
  }

  state: State = {
    w: this.props.w,
    h: this.props.h
  }

  //
  // @important
  //

  onResize = (eventName, {element, size}) => {
    let {w,h} = size

    this.setState(size, () => {
      this.props.onResize && this.props.onResize(eventName, {element, size})
    })
  }

  onResize: (eventName: Event, data: ResizeData) => void


  //
  // render
  //

  render(): React.Element {
    let {
      onResizeStart, onResizeStop, constrainAspectRatio, w, h, ...props
    } = this.props

    return (
      <DragToResize
        w={this.state.w}
        h={this.state.h}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        onResizing={onResizing}
        constrainAspectRatio={constrainAspectRatio}
      >
        <div style={{width: this.state.w + 'px', height: this.state.h + 'px'}} {...props} />
      </DragToResize>
    )
  }

}
