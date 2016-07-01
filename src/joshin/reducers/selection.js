import * as Selection from '../actions/selection'

let initialState = {
  uploadedImages: [],
  selectedImage: null,
  selectionMode: false,
  uploading: false,
  transactions: {
    uploads: [],
    edits: []
  },
  pending: [],
  tools: [],
  selectedTool: null,

  newFiles: [],
  info: [],

  fileUploadToolState: {
    clicked: false,
    dragActive: false,
    dragReject: false,
    activeTransfer: null,
    allAccepted: null,
    enters: 0
  }
}

export default function reducer (state = initialState, action) {

  switch (action.type) {
    
    case Selection.NEW_IMAGES_TO_EDIT:
          return {...state, info: [{
            msg: 'You have new',
            data: state.newFiles
          }, ...info]}
    
    case Selection.UPLOAD_IMAGES:
          return {...state, selectionMode: true}
    case Selection.UPLOAD_TRANSACTION_START:
          return {...state, uploading: true}
    case Selection.UPLOAD_TRANSACTION_FINISH:
          return {...state, uploading: false}

    case Selection.FUP_DRAG_START:
          return {...state, fileUploadToolState: {
            dragActive: true,
            activeTransfer: action.e.dataTransfer
          }}
    case Selection.FUP_DRAG_FINISHED:
      return {...state, fileUploadToolState: {
        dragActive: false,
        activeTransfer: null
      }}
    case Selection.FUP_DRAG_ENTER_TGT:

      let enters = ++state.fileUploadToolState.enters
      const dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];
      const allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));

      return {...state, fileUploadToolState: {
        dragActive: allFilesAccepted,
        dragReject: !allFilesAccepted,
        allAccepted: allFilesAccepted,
        enters
      }}

    case Selection.FUP_DRAG_DROP:

      const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      const max = this.props.multiple ? droppedFiles.length : Math.min(droppedFiles.length, 1);
      const files = [];

      for (let i = 0; i < max; i++) {
        const file = droppedFiles[i]
        files.push(file)
      }

      return {...state, newFiles: [files, ...state.newFiles], fileUploadToolState: {
        dragActive: false, dragReject: false, enters: 0, activeTransfer:null, allAccepted: null
      }}

    default:
      return state
  }

}
