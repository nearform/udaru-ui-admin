import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Panel from './'
import { Text } from '../'

storiesOf('Components/Panel', module)
  .add(
    'Panel component',
    withInfo({
      inline: true,
      text: `A container with a styled title and body content`
    })(() => <Panel m={4} title="Panel title">Body text</Panel>)
  )
  