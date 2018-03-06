import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { space, propTypes } from 'styled-system'

const Panel = (props) => {
  return (
    <div className={props.className}>
      <div className="panel-header"><strong>{props.title}</strong></div>
      <div className="panel-body">{props.children}</div>
    </div>
  )
}

const StyledPanel = styled(Panel)`
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  ${space};

  .panel-header {
    border-bottom: 1px solid #ddd;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    color: #333;
    background-color: #f5f5f5;
    padding: 1rem 2rem;
  }

  .panel-body {
    padding: 1rem 2rem;
  }
`

StyledPanel.propTypes = {
  ...propTypes.space,
  title: PropTypes.string.isRequired
}

StyledPanel.displayName = 'Panel'

export default StyledPanel
