import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Heading from '../Heading'
import Hr from '../Hr'
import { space, propTypes } from 'styled-system'

const PageHeader = ({children, className}) => {
  return (
    <div className={className}>
      <Heading.h1>{children}</Heading.h1>
      <Hr />
    </div>
  )
}

// Add styling or props as needed based on design

const StyledPageHeader = styled(PageHeader)`
  ${space}
`

StyledPageHeader.propTypes = {
  ...propTypes.space
}

StyledPageHeader.displayName = 'PageHeader'

export default StyledPageHeader