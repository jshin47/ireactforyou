import React from 'react'
import ReactDOM from 'react-dom'
import {AppBar, Card, Badge, Toolbar, GridList, Menu, MenuItem, Step, StepButton, Stepper, StepContent} from './../../../../node_modules/material-ui/'
import ReactDnd from 'react-dnd'
import _ from 'lodash';
import ImageEditorPane from './ImageEditorPane'
import ImageEditorToolingPane from './ImageEditorToolingPane'
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ImageEditingLayout extends React.Component {

  constructor (P, X) {
    super (P, X)

    this.state = {
      currentBreakpoint: 'lg'
    }
  }

  static propTypes = {
    onLayoutChange: React.PropTypes.func.isRequired
  }

  static mkKey = (x, y, w, h) => {
    return (x + w, y + h).toString()
  }

  static defaultProps = {
    className: 'img-edit-layout',
    rowHeight: 45,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    useCSSTransforms: true,
    layouts: {
      lg: [
        {
          x: 0,
          y: 0,
          w: 8,
          h: 1,
          i: 'main'
        },
        {
          x: 8,
          y: 0,
          w: 4,
          h: 1,
          i: 'side'
        }
      ]
    }
  }

  onBreakpointChange = (newBkpt) => {
    this.setState({
      currentBreakpoint: newBkpt
    })
  }

  render = () => {

    // onBreakpointChange ={this.onBreakpointChange}

    return (
      <div>
        <ResponsiveReactGridLayout {...this.props}>
          <ImageEditorPane key='main' ></ImageEditorPane>
          <ImageEditorToolingPane key='side'></ImageEditorToolingPane>
        </ResponsiveReactGridLayout>
      </div>

    )
  }

}

