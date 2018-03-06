import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as StyledThemeProvider } from 'emotion-theming'
import styled, { injectGlobal } from 'react-emotion'
import theme from './theme'

injectGlobal`body {
  margin: 0;
}`

export const Base = styled.div`
  color: #333333;
  font-family: ${theme.font};
  font-size: ${theme.fontSizes[2]}px;
  line-height: 1.5;

  * {
    box-sizing: border-box;
  }
`

const ThemeProvider = ({ legacy, customBreakpoints, ...props }) => {
  return (
    <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
  )
}

export default ThemeProvider
