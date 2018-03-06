import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { space, propTypes } from 'styled-system'
import theme from '../theme'

const InputGroup = (props) => {
  let validationState = props.validationState ? props.validationState : ''
  return (
    <div className={`${props.className} ${validationState}`}>
      {props.children}
    </div>
  )
}

const StyledInputGroup = styled(InputGroup)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 16px;
  ${space};
`

StyledInputGroup.propTypes = {
  ...propTypes.space,
  validationState: PropTypes.string,
  theme: PropTypes.object
}

StyledInputGroup.displayName = 'InputGroup'

export default StyledInputGroup
