import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Label from './'

storiesOf('Components/Label', module)
  .add(
    'Label component',
    withInfo({
      inline: true,
      text: `A Label component to be used within InputGroup`
    })(() => <Label m={4} htmlFor="formId">Form Label</Label>)
  )