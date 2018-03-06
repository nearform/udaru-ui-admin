import { Box } from 'grid-styled'
import withProps from 'recompose/withProps'
import theme from '../theme'

const ThemedBox = withProps({ theme })(Box)

export default ThemedBox
