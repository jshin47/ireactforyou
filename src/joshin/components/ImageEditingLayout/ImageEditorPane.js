import React, {Component, PropTypes} from 'react'
import {TransformableContainer} from '../../elements/transformable/TransformableContainer'
import {RaisedButton} from 'material-ui'

export default class ImageEditorPane extends Component {

  static propTypes = {

    editTarget: PropTypes.object

  }

  renderSelected = () => {
    return (
      <TransformableContainer>
        <img src={this.props.editTarget} />
      </TransformableContainer>
    )
  }

  renderDowner = () => {

    return (

      <RaisedButton
        title="Go"
      >
        <span>You need to select</span>

      </RaisedButton>

    )
  }

  render = () => {

    if (!this.props.editTarget) {
      return this.renderDowner()
    } else {
      return this.renderSelected()
    }

  }

}
