import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Box, Flex, Heading } from '../'

const StyledBox = (props) => {
  return (
    <Box style={{backgroundColor: '#eee'}} m={4} p={2} {...props}></Box>
  )
}

storiesOf('Components/Flex', module)
  .add(
    'Flex component',
    withInfo({
      inline: true,
      text: `A Flexbox-enabled container, used to wrap and control Box components`
    })(() => <Flex justifyContent="center"><Box>Flex with Box aligned center</Box></Flex>)
  )
  .add('With boxes', () => (
    <Flex>
      <StyledBox>Box 1</StyledBox>
      <StyledBox>Box 2</StyledBox>
      <StyledBox>Box 3</StyledBox>
    </Flex>
  ))
  .add('Justify content', () => (
    <div>
      <Heading.h3 ml={22}>flex-start</Heading.h3>
      <Flex justifyContent="flex-start">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>flex-end</Heading.h3>
      <Flex justifyContent="flex-end">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>center</Heading.h3>
      <Flex justifyContent="center">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>space-between</Heading.h3>
      <Flex justifyContent="space-between">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>space-around</Heading.h3>
      <Flex justifyContent="space-around">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
    </div>
  ))
  .add('Flex direction', () => (
    <div>
      <Heading.h3 ml={22}>row</Heading.h3>
      <Flex flexDirection="row">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>row-reverse</Heading.h3>
      <Flex flexDirection="row-reverse">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>column</Heading.h3>
      <Flex flexDirection="column">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>column-reverse</Heading.h3>
      <Flex flexDirection="column-reverse">
        <StyledBox>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox>Box 3</StyledBox>
      </Flex>
    </div>
  ))
  .add('Align items', () => (
    <div>
      <Heading.h3 ml={22}>flex-start</Heading.h3>
      <Flex alignItems="flex-start">
        <StyledBox py={4}>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox py={5}>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>flex-end</Heading.h3>
      <Flex alignItems="flex-end">
        <StyledBox py={4}>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox py={5}>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>center</Heading.h3>
      <Flex alignItems="center">
        <StyledBox py={4}>Box 1</StyledBox>
        <StyledBox>Box 2<br />extra text</StyledBox>
        <StyledBox py={5}>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>stretch</Heading.h3>
      <Flex alignItems="stretch">
        <StyledBox py={4}>Box 1</StyledBox>
        <StyledBox>Box 2</StyledBox>
        <StyledBox py={5}>Box 3</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>baseline</Heading.h3>
      <Flex alignItems="baseline">
        <StyledBox py={4}>Box 1</StyledBox>
        <StyledBox>Box 2<br />extra text</StyledBox>
        <StyledBox py={5}>Box 3</StyledBox>
      </Flex>
    </div>
  ))
