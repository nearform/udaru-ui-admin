import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Tooltip from './'
import { Box, Button, Heading } from '../'

storiesOf('Components/Tooltip', module)
  .add(
    'Tooltip component',
    withInfo({
      inline: true,
      text: `A tooltip component that appears on click or hover beside an element`
    })(() => <Tooltip placement="left" trigger={['hover']} overlay="Some text here"><a href='#'>Hover me</a></Tooltip>)
  )
  .add('variations', () => (
    <div>
      <Box m={2}>
        <Heading.h2 ml={2}>Tooltip placement</Heading.h2>
        <Tooltip placement="right" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on right</Button>
        </Tooltip>
        <Tooltip placement="left" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on left</Button>
        </Tooltip>
        <Tooltip placement="top" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on top</Button>
        </Tooltip>
        <Tooltip placement="bottom" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on bottom</Button>
        </Tooltip>
      </Box>
      <Box m={2}>
        <Tooltip placement="topRight" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on top right</Button>
        </Tooltip>
        <Tooltip placement="topLeft" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on top left</Button>
        </Tooltip>
        <Tooltip placement="bottomLeft" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on bottom left</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" trigger={['hover']} overlay="Some text here">
          <Button m={2}>Tip on bottom right</Button>
        </Tooltip>
      </Box>

      <Box m={2}>
        <Heading.h2 ml={2}>HTML in overlay</Heading.h2>
        <Tooltip placement="right" trigger={['hover']} overlay={<div>Some <strong>bold text</strong> here</div>}>
          <Button m={2}>Tip on right</Button>
        </Tooltip>
      </Box>
    </div>
  ))