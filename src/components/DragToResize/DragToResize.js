
import {default as React, PropTypes} from 'react'
import {DraggableCore} from 'react-draggable'
import {deepCopyElementWithStyleAndClassNameAndProps} from './../../core/DOMUtils'


type Size = {
  w: number,
  h: number
}

type State = {
  isResizing: boolean,
  w: number,
  h: number,
  missingW: number,
  missingH: number,
}

type DragCallbackData = {
  node: HTMLElement,
  x: number,
  y: number,
  dX: number,
  dY: number,
  pX: number,
  pY: number
}

export default class DragToResize extends React.Component {

  static propTypes = {

    // @required

    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,

    children: PropTypes.element.isRequired,

    // @optional

    onResizeStart: PropTypes.func,
    onResizeStop:  PropTypes.func,
    onResizing:    PropTypes.func,

    // no effect yet
    // TODO: make it do something later

    minSize: PropTypes.object,
    maxSize: PropTypes.object,

    constrainAspectRatio: PropTypes.boolean

  }

  static defaultProps = {

    minSize: {
      w: 10,
      h: 10
    },

    maxSize: {
      w: Infinity,
      h: Infinity
    },

    constrainAspectRatio: true

  }

  state: State = {

    isResizing: false,
    w: this.props.w,
    h: this.props.h,
    missingW: 0,
    missingH: 0

  }

  //
  // help
  //

  propsSizeChanged(next: Object) {
    return (next.props.w !== this.props.w || next.props.h !== this.props.h)
  }

  onResize(eventName: string): Function {
    return
      (e, {node, dX, dY}: DragCallbackData) => {
        let w = this.state.w + dX
        let h = this.state.h + dY
        let deltaW = Math.abs(w - this.state.w)
        let deltaH = Math.abs(h - this.state.h)

        if (eventName === 'resizing' && deltaW === 0 && deltaH === 0)
          return

        let next = {}
        let whichCallback = ''

        switch (eventName) {
          case 'start':
            next.isResizing = true
            whichCallback = 'onResizeStart'
            break
          case 'stop':
            next.isResizing = false
            whichCallback = 'onResizeStop'
            break
          default:
            next.w = w
            next.h = h
            whichCallback = 'onResize'
            break
        }

        this.setState(next, () => {
          this.props[whichCallback] && this.props[whichCallback](e, {node, size: {w, h}})
        })
      }
  }

  //
  // lifecycle of component
  //

  componentWillReceiveProps(next: Object) {
    if (!this.state.isResizing && this.propsSizeChanged(next)) {
      this.setState({
        w: next.w,
        h: next.h
      })
    }
  }




  render(): React.Element {
    let { w, h, ...P } = this.props
    let clazz = P.className ? `${P.className} drag-to-resize` : `drag-to-resize`

    return deepCopyElementWithStyleAndClassNameAndProps(
      P.children,

      {
        ...P,

        clazz,

        children: [
          P.children.props.children,

          <DraggableCore
            key="dragToResizeNotch"
            ref="draggable"
            onStop={this.onResize('stop')}
            onStart={this.onResize('start')}
            onDrag={this.onResize('resizing')}
          >
            <span className="react-resizable-handle" />


          </DraggableCore>
        ]

      }
    )

  }


}


