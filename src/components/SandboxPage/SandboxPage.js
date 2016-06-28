import React, { Component, PropTypes } from 'react';
import DragToResize from './../DragToResize/DragToResize'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SandboxPage.scss';

class SandboxPage extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string,
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.context.onSetTitle(this.props.title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <DragToResize className="box" h = {100} w={100} >
            <div className="box" />
          </DragToResize>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
        </div>
      </div>
    )
  }

}

export default withStyles(SandboxPage, s)
