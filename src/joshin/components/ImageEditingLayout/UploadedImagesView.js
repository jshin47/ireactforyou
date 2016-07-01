import React from 'react'
import GridList from 'material-ui/GridList'
import * as actions from './../../actions/selection'
import {connect} from 'react-redux'
const GridListV = GridList.GridList
const GridTileV = GridList.GridTile
class UploadedImagesView extends React.Component {

  onComponentWillMount = () => {
    this.props.dispatch(actions.updateImagesLatest())
  }

  onComponentShouldUpdate = () => {
    if (this.props.stale)
      this.props.dispatch(actions.updateImagesLatest())
  }

  render = () => {


    return (
      <GridListV row={2} cols={6}>
        {this.props.images.map(m => (<UploadedImageView image={m} />))}
      </GridListV>
    )
  }

}

class UploadedImageView extends React.Component {

  render () {
    return (
      <GridTileV>
        <Image src={this.props.image.data} />
        
      </GridTileV>
    )
  }

}

function select (state) {
  return {
    data: {
      stale: (state.newImages.length > 0),
      images: state.uploadedImages,
      messages: state.info
    }
  }
}

export default connect(select)(UploadedImagesView)
