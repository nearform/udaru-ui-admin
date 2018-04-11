import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Button from './'

storiesOf('Components/Button', module)
  .add(
    'Button component',
    withInfo({
      inline: true,
      text:
        `Use the \`Button\` component with a set \`variation\` to change style.

        Variations: [primary, success, info, warning, danger, link]`
    })(() => <Button variant="primary" ml={42} onClick={action('clicked')}>Default Button</Button>)
  )
  .add('default text button', () => (
    <Button m={2} onClick={action('clicked')}>Default Button</Button>
  ))
  .add('primary', () => (
    <Button m={2} variant="primary" onClick={action('clicked')}>Primary Button</Button>
  ))
  .add('success', () => (
    <Button m={2} variant="success" onClick={action('clicked')}>Success Button</Button>
  ))
  .add('info', () => (
    <Button m={2} variant="info" onClick={action('clicked')}>Info Button</Button>
  ))
  .add('warning', () => (
    <Button m={2} variant="warning" onClick={action('clicked')}>Warning Button</Button>
  ))
  .add('danger', () => (
    <Button m={2} variant="danger" onClick={action('clicked')}>Danger Button</Button>
  ))
  .add('link', () => (
    <Button m={2} variant="link" onClick={action('clicked')}>Link Button</Button>
  ))