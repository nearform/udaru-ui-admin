import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import InputGroup from '../InputGroup'
import Select from '../Select'

storiesOf('Components/Select', module)
  .add(
    'Select component',
    withInfo({
      inline: true,
      text: `A text input styled with error and success states if wrapped in InputGroup`
    })(() => (
      <Select m={4} id="example" value="Input value" onChange={action('changed')}>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
      )
    ))
  .add('single', () => (
    <InputGroup m={4} validationState={() => 'error'}>
      <Select id="example" placeholder="Placeholder" onChange={action('changed')}>
        <option val="1">One</option>
        <option val="2">Two</option>
        <option val="3">Three</option>
      </Select>
    </InputGroup>
  ))
  .add('multiple', () => (
    <InputGroup m={4} validationState={() => 'success'}>
      <Select id="example" multiple placeholder="Placeholder" onChange={action('changed')}>
        <option val="1">One</option>
        <option val="2">Two</option>
        <option val="3">Three</option>
      </Select>
    </InputGroup>
  ))
  .add('disabled', () => (
    <Select m={4} disabled id="example" placeholder="Placeholder" onChange={action('changed')}>
      <option val="1">One</option>
      <option val="2">Two</option>
      <option val="3">Three</option>
    </Select>
  ))
  