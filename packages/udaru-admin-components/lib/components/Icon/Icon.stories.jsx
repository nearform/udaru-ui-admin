import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Icon from './'
import { Flex, Box, Text } from '../'

storiesOf('Components/Icon', module)
  .add(
    'Icon component',
    withInfo({
      inline: true,
      text: ``
    })(() => <Icon name="arrowRight" color="blue" size={128} />)
  )
  .add('all icons', () => (
    <Flex wrap>
      <Box p={2} m={2} bg="#eee">
        <Icon name="arrowRight" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>arrowRight</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="arrowLeft" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>arrowLeft</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="arrowUp" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>arrowUp</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="arrowDown" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>arrowDown</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="tick" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>tick</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="close" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>close</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="google" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>google</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="facebook" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>facebook</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="twitter" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>twitter</Text.p>
      </Box>
      <Box p={2} m={2} bg="#eee">
        <Icon name="linkedin" color="black" size={64} />
        <Text.p fontSize={0} pt={2} m={0}>linkedin</Text.p>
      </Box>
    </Flex>
  ))