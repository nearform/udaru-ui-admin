import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Alert from './'
import { Text } from '../'

storiesOf('Components/Alert', module)
  .add(
    'Alert component',
    withInfo({
      inline: true,
      text:
        `Use the \`Button\` component with a set \`variation\` to change style.

        Variations: [warning, danger, success, info]`
    })(() => <Alert mx={4} variant="warning" onDismiss={() => (alert('Dismiss'))}><Text.span bold>Warning!</Text.span> This is a warning.</Alert>)
  )
  .add('warning', () => (
    <Alert m={2} variant="warning"><Text.span bold>Warning!</Text.span> This is a warning.</Alert>
  ))
  .add('danger', () => (
    <Alert m={2} variant="danger"><Text.span bold>Danger!</Text.span> This alert is more serious.</Alert>
  ))
  .add('success', () => (
    <Alert m={2} variant="success"><Text.span bold>Success!</Text.span> Well done, you.</Alert>
  ))
  .add('info', () => (
    <Alert m={2} variant="info"><Text.span bold>Information!</Text.span> This is for information.</Alert>
  ))
  .add('dismiss', () => (
    <Alert m={2} variant="info" onDismiss={() => (alert('Dismiss'))}><Text.span bold>Information!</Text.span> This is for information.</Alert>
  ))
  
  