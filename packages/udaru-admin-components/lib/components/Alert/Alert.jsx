import React from 'react';
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import withProps from 'recompose/withProps'
import { lighten, darken } from 'polished'
import { space, propTypes } from 'styled-system'
import { Icon } from '../'
import theme from '../theme'

const Alert = (props) => {
  const { onDismiss, children, ...rest} = props
  return (
    <div role="alert" {...rest}>
      {children}
      {
        onDismiss && (
          <span className="dismiss-alert" onClick={onDismiss}>
            <Icon name="close" size={8} />
          </span>
        )
      }
    </div>
  )
}

const StyledAlert = withProps({theme})(styled(Alert)`
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  ${space};

  ${props => props.variant === 'warning' && `
    background-color: ${lighten(0.3, props.theme.colors.orange)};
    border-color: ${lighten(0.2, props.theme.colors.orange)};
    color: ${darken(0.3, props.theme.colors.orange)};
  `}

  ${props => props.variant === 'danger' && `
    background-color: ${lighten(0.3, props.theme.colors.danger)};
    border-color: ${lighten(0.2, props.theme.colors.danger)};
    color: ${darken(0.2, props.theme.colors.danger)};
  `}

  ${props => props.variant === 'success' && `
    background-color: ${lighten(0.3, props.theme.colors.green)};
    border-color: ${lighten(0.2, props.theme.colors.green)};
    color: ${darken(0.3, props.theme.colors.green)};
  `}

  ${props => props.variant === 'info' && `
    background-color: ${lighten(0.3, props.theme.colors.lightBlue)};
    border-color: ${lighten(0.2, props.theme.colors.lightBlue)};
    color: ${darken(0.3, props.theme.colors.lightBlue)};
  `}

  .dismiss-alert {
    cursor: pointer;
    position: absolute;
      top: .1em;
      right: .5em;
    opacity: .25;

    &:hover {
      opacity: 1;
    }
  }
`)

const variations = ['warning', 'danger', 'success', 'info'];

StyledAlert.propTypes = {
  ...propTypes.space,
  variant: PropTypes.oneOf(variations),
  onDismiss: PropTypes.func,
  theme: PropTypes.object
}

StyledAlert.defaultProps = {
  variant: 'warning'
}

StyledAlert.displayName = 'Alert'

export default StyledAlert