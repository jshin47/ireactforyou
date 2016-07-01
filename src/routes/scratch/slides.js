
import React from 'react'
import * as Prez from 'react-presentation'
import * as MDL from 'material-ui'

import {TransformableContainer} from '../../../joshin/elements/transformable/TransformableContainer'

const {
  Presentation,
  Slide,
  ...Others
} = Prez

export default class extends React.Component {

  render = () => (

    <Presentation>
      <Slide>
        <h1>test</h1>
      </Slide>
    </Presentation>

  )

}
