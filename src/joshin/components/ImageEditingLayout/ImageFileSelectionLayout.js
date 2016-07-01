import React from 'react'
import UIV from './UploadedImagesView'
import {Dialog} from 'material-ui'

export class ImageFileSelectionLayout extends React.Component {

  render () {

    <div>
      <figure>
        <main>
          <UIV />
        </main>
        <figcaption>Select from existing images in the gallery</figcaption>
      </figure>


    </div>


  }

}

class ModalWrapper extends React.Component {
  render () {
    return (
      <Dialog draggable="false">
        <ImageFileSelectionLayout />
      </Dialog>
    )
  }
}

export default ModalWrapper
