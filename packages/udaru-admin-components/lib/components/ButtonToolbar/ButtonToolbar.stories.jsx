import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import ButtonToolbar from './'
import { Button } from '../'

const description = `Group together multiple buttons`

storiesOf('Components/ButtonToolbar', module)
  .add(
    'ButtonToolbar component',
    withInfo({
      inline: true,
      text: description
    })(() => (
      <ButtonToolbar pl={24}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="info">Info Button</Button>
      </ButtonToolbar>
    ))
  )
  .add('Multiple buttons', () => (
    <ButtonToolbar py={2}>
      <Button variant="primary">Primary Button</Button>
      <Button variant="info">Info Button</Button>
      <Button variant="success">Success Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="link">Link Button</Button>
    </ButtonToolbar>
  ))
