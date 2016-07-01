
export const UPDATE_UPLOADED_IMAGE_LIST = 'UPDATE_UPLOADED_IMAGE_LIST'
export const SELECT_IMAGE = 'SELECT_IMAGE'
export const UPLOAD_IMAGES = 'UPLOAD_IMAGES'

export const FUP_CLICK = 'FUP_CLICK'
export const FUP_DRAG_START = 'FUP_DRAG_START'
export const FUP_DRAG_ENTER_TGT = 'FUP_DRAG_OVER_TGT'
export const FUP_DRAG_LEFT_TGT = 'UPLOAD_DRAG_REJECT'
export const FUP_DRAG_FINISHED = 'UPLOAD_DRAG_REJECT'
export const FUP_DRAG_DROP = 'UPLOAD_DRAG_REJECT'

export const UPLOAD_TRANSACTION_START = 'UPLOAD_TRANSACTION_START'
export const UPLOAD_TRANSACTION_FINISH = 'UPLOAD_TRANSACTION_FINISH'
export const NEW_IMAGES_TO_EDIT = 'NEW_IMAGES_TO_EDIT'

export function fupDragStart (e) {
  return {
    type: FUP_DRAG_START,
    e
  }
}

export function fupDragEnterTgt (e) {
  return {
    type: FUP_DRAG_ENTER_TGT,
    e
  }
}

export function fupDragLeftTgt (e) {
  return {
    type: FUP_DRAG_LEFT_TGT,
    e
  }
}

export function fupDragFinished (e) {
  return {
    type: FUP_DRAG_FINISHED,
    e
  }
}

export function fupDrop (e) {
  return {
    type: FUP_DRAG_DROP,
    e
  }
}

export function fupKlik (e) {
  return {
    type: FUP_CLICK,
    e
  }
}

export function uploadImages () {
  return {
    type: UPLOAD_IMAGES
  }
}

export function uploadStart (el) {
  return {
    type: UPLOAD_TRANSACTION_START,
    el
  }
}

export function uploadFinish (el) {
  return {
    type: UPLOAD_TRANSACTION_FINISH,
    el
  }
}

export function updateImagesLatest () {
  return {
    type: UPDATE_UPLOADED_IMAGE_LIST
  }
}
