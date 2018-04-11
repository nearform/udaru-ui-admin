import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { space, fontSize, fontWeight, color, propTypes } from 'styled-system'
import theme from '../theme'


const Label = styled('label')`
  display: block;
  width: 100%;

  ${space} ${fontSize} ${color} ${fontWeight};

  .success & {
    color: #3c763d;
  }

  .error & {
    color: #a94442;
  }
`

Label.propTypes = {
  htmlFor: PropTypes.string,
  ...propTypes.space,
  ...propTypes.fontSize,
  ...propTypes.color,
  ...propTypes.fontWeight
}

Label.defaultProps = {
  fontSize: `${theme.fontSizes[2]}px`,
  fontWeight: 'bold',
  color: 'black',
  theme: theme
}

Label.displayName = 'Label'

export default Label
