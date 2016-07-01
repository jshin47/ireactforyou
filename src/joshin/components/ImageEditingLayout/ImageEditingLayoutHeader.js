import React, { Component} from 'react'
import * as All from 'material-ui'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageEditingLayoutHeader.scss'

export default class ImageEditingLayoutHeader extends Component {
  
  render () {
    
    return (
      <All.Toolbar
        className={s.toolbar}
      >
        
      </All.Toolbar>
    )
  }
  
} 
