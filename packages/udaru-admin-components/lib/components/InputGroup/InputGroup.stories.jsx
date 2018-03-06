import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import InputGroup from './'
import Input from '../Input'
import Label from '../Label'
import Select from '../Select'

storiesOf('Components/InputGroup', module)
  .add(
    'InputGroup component',
    withInfo({
      inline: true,
      text: `A grouped input including label, and error and success states`
    })(() => (
      <InputGroup m={4} validationState="">
        <Label htmlFor="example">Label Text</Label>
        <Input id="example" type="text" value="Input value" onChange={action('changed')} onBlur={action('blur')} />
      </InputGroup>
      )
    ))
  .add('error', () => (
    <InputGroup m={4} validationState="error">
      <Label htmlFor="example">Label Text</Label>
      <Input id="example" type="text" value="" placeholder="Placeholder" onChange={action('changed')} onBlur={action('blur')} />
    </InputGroup>
  ))
  .add('success', () => (
    <InputGroup m={4} validationState="success">
      <Label htmlFor="example">Label Text</Label>
      <Input id="example" type="text" value="" placeholder="Placeholder" onChange={action('changed')} onBlur={action('blur')} />
    </InputGroup>
  ))
  .add('with select (single)', () => (
    <InputGroup m={4} validationState="">
      <Select id="example" placeholder="Placeholder" onChange={action('changed')}>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    </InputGroup>
  ))
  .add('with select (multiple)', () => (
    <InputGroup m={4} validationState="">
      <Select id="example" value={["2"]} multiple placeholder="Placeholder" onChange={action('changed')}>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
    </InputGroup>
  ))
  .add('with select (disabled)', () => (
    <Select m={4} disabled id="example" placeholder="Placeholder" onChange={action('changed')}>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Select>
  ))
  .add('with select (multiple, disabled)', () => (
    <Select m={4} disabled multiple id="example" placeholder="Placeholder" onChange={action('changed')}>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Select>
  ))
  