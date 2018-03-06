import { Flex } from 'grid-styled'
import withProps from 'recompose/withProps'
import theme from '../theme'

const ThemedFlex = withProps({ theme })(Flex)

export default ThemedFlex
