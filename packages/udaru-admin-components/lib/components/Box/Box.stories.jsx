import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Box, Flex, Heading } from '../'

const StyledBox = (props) => {
  return (
    <Box style={{backgroundColor: "#eee"}} m={2} p={2} {...props}></Box>
  )
}

storiesOf('Components/Box', module)
  .add(
    'Box component',
    withInfo({
      inline: true,
      text: `Containers that can be used within a Flex component`
    })(() => <Box style={{backgroundColor: '#eee'}} width={1/2}>Half-width</Box>)
  )
  .add('With widths', () => (
    <div>
      <Heading.h3 ml={22}>Percentage widths</Heading.h3>
      <StyledBox width={1/3}>width={`{1/3}`}</StyledBox>
      <StyledBox width={1/2}>width={`{1/2}`}</StyledBox>
      <StyledBox width={2/3}>width={`{2/3}`}</StyledBox>
      <StyledBox width={1}>width={`{1}`}</StyledBox>
      <Heading.h3 ml={22}>Pixel values</Heading.h3>
      <StyledBox width={120}>width={`{120}`}</StyledBox>
      <StyledBox width={200}>width={`{200}`}</StyledBox>
      <StyledBox width={300}>width={`{300}`}</StyledBox>
      <Heading.h3 ml={22}>CSS values</Heading.h3>
      <StyledBox width="10em">width="10em"</StyledBox>
      <StyledBox width="50vw">width="50vw"</StyledBox>
      <StyledBox width="32rem">width="32rem"</StyledBox>
      <Heading.h3 ml={22}>Responsive widths</Heading.h3>
      <StyledBox width={[1/2, 1/3, 1/4, 1/6]}>width={`{[1/2, 1/3, 1/4, 1/6]}`}</StyledBox>
    </div>
  ))
  .add('With padding', () => (
    <div>
      <StyledBox p={4}>p={`{4}`}</StyledBox>
      <StyledBox pt={4}>pt={`{4}`}</StyledBox>
      <StyledBox pb={4}>pb={`{4}`}</StyledBox>
      <StyledBox pl={4}>pl={`{4}`}</StyledBox>
      <StyledBox pr={4}>pr={`{4}`}</StyledBox>
      <StyledBox px={4}>px={`{4}`}</StyledBox>
      <StyledBox py={4}>py={`{4}`}</StyledBox>
    </div>
  ))
  .add('With margin', () => (
    <div>
      <StyledBox m={4}>m={`{4}`}</StyledBox>
      <StyledBox mt={4}>mt={`{4}`}</StyledBox>
      <StyledBox mb={4}>mb={`{4}`}</StyledBox>
      <StyledBox ml={4}>ml={`{4}`}</StyledBox>
      <StyledBox mr={4}>mr={`{4}`}</StyledBox>
      <StyledBox mx={4}>mx={`{4}`}</StyledBox>
      <StyledBox my={4}>my={`{4}`}</StyledBox>
    </div>
  ))
  .add('With Flex', () => (
    <div>
      <Heading.h3 ml={22}>Flex shorthand (e.g. flex="0 0 200px")</Heading.h3>
      <Flex>
        <StyledBox flex="0 0 200px">No grow, no shrink</StyledBox>
        <StyledBox flex="1 0 200px">Grow, no shrink (200px)</StyledBox>
        <StyledBox flex="1 1 200px">Grow, shrink</StyledBox>
      </Flex>
      <Heading.h3 ml={22}>Order</Heading.h3>
      <Flex>
        <StyledBox order="2">First box (order="2")</StyledBox>
        <StyledBox order="3">Second box (order="3")</StyledBox>
        <StyledBox order="1">Third box (order="1")</StyledBox>
      </Flex>
    </div>
  ))
  .add('Responsive widths', () => (
    <div>
      <Heading.h3 ml={22}>Responsive Box Sizing</Heading.h3>
      <Flex flexWrap={["wrap", "no-wrap", "no-wrap"]}>
        <Box bg="#eee" p={4} width={[1, 1/2, 1/4]}>Box Content</Box>
        <Box bg="#eee" p={4} width={[1, 1/2, 1/4]}>Box Content</Box>
        <Box bg="#eee" p={4} width={[1, 1/2, 1/4]}>Box Content</Box>
        <Box bg="#eee" p={4} width={[1, 1/2, 1/4]}>Box Content</Box>
      </Flex>
    </div>
  ))
  .add('Responsive font sizes', () => (
    <div>
      <Heading.h3 ml={22}>Responsive Font Size</Heading.h3>
      <Flex flexWrap={["wrap", "no-wrap", "no-wrap"]}>
        <Box bg="#eee" p={4} fontSize={[ 1, 3, 6 ]}>Box Content</Box>
      </Flex>
    </div>
  ))

