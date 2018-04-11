import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { space, propTypes } from 'styled-system'

const ButtonToolbar = ({children, className}) => {
  return (
    <div role="toolbar" className={className}>
      {children}
    </div>
  )
}

// Add styling or props as needed based on design

ButtonToolbar.propTypes = {
  ...propTypes.space
}

const StyledButtonToolbar = styled(ButtonToolbar)`
  margin: 0 15px; // Default
  ${space} // Override if needed

  & > button,
  & > a {
    margin-left: .25rem;
    margin-right: .25rem;
  }
`

StyledButtonToolbar.displayName = 'ButtonToolbar'

export default StyledButtonToolbar