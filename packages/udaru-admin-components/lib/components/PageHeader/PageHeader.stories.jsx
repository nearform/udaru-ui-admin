import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import PageHeader from './'

const description = `A heading element that includes a horizonal rule`

storiesOf('Components/PageHeader', module)
  .add(
    'PageHeader component',
    withInfo({
      inline: true,
      text: description
    })(() => <PageHeader m={4}>Page Header</PageHeader>)
  )
  .add('Simple header', () => (
    <PageHeader m={4}>Page Header</PageHeader>
  ))
  .add('Using <small> element', () => (
    <PageHeader m={4}>Page Header <small>Sub title</small></PageHeader>
  ))
