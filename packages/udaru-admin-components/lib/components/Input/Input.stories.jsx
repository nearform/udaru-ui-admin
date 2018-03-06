import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import InputGroup from '../InputGroup'
import Input from '../Input'

storiesOf('Components/Input', module)
  .add(
    'Input component',
    withInfo({
      inline: true,
      text: `A text input styled with error and success states if wrapped in InputGroup`
    })(() => (
      <Input m={4} id="example" type="text" value="Input value" onChange={action('changed')} onBlur={action('blur')} />
      )
    ))
  .add('error', () => (
    <InputGroup m={4} validationState='error'>
      <Input id="example" type="text" value="" placeholder="Placeholder" onChange={action('changed')} onBlur={action('blur')} />
    </InputGroup>
  ))
  .add('success', () => (
    <InputGroup m={4} validationState='success'>
      <Input id="example" type="text" value="" placeholder="Placeholder" onChange={action('changed')} onBlur={action('blur')} />
    </InputGroup>
  ))
  .add('disabled', () => (
    <Input m={4} disabled id="example" type="text" value="" placeholder="Placeholder" onChange={action('changed')} onBlur={action('blur')} />
  ))
  