import React from 'react';
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { lighten, darken } from 'polished'
import { space, propTypes } from 'styled-system'
import withProps from 'recompose/withProps'
import theme from '../theme'

const Button = (props) => {
  return <button {...props}>{props.children}</button>
}

const StyledButton = withProps({theme})(styled(Button)`
  background: #eee;
  border-radius: ${props => props.theme.radius};
  border: 1px solid transparent;
  color: ${props => props.theme.colors.black};
  display: inline-block;
  font-weight: ${props => props.theme.fontWeights.regular};
  line-height: 1.5;
  padding: 6px 12px;
  text-align: center;
  transition: all ${props => props.theme.speeds.fast} ${props => props.theme.easings.easeOut};
  vertical-align: middle;
  white-space: nowrap;
  ${space};

  &[disabled] {
    background: #eee !important;
    opacity: .8;
  }

  ${props => props.variant === 'primary' && `
    background-color: ${props.theme.colors.primary};
    border-color: ${props.theme.colors.primary};
    color: #fff;

    &:hover {
      background-color: ${darken(.1, props.theme.colors.primary)};
      border-color: ${darken(.15, props.theme.colors.primary)};
      color: #fff;
    }
  `}

  ${props => props.variant === 'success' && `
    background-color: ${props.theme.colors.green};
    border-color: darken(.05, ${props.theme.colors.green});
    color: #fff;

    &:hover {
      background-color: ${darken(.1, props.theme.colors.green)};
      border-color: ${darken(.15, props.theme.colors.green)};
      color: #fff;
    }
  `}

  ${props => props.variant === 'info' && `
    background-color: ${props.theme.colors.lightBlue};
    border-color: darken(.05, ${props.theme.colors.lightBlue});
    color: #fff;

    &:hover {
      background-color: ${darken(.1, props.theme.colors.lightBlue)};
      border-color: ${darken(.15, props.theme.colors.lightBlue)};
      color: #fff;
    }
  `}

  ${props => props.variant === 'warning' && `
    background-color: ${props.theme.colors.orange};
    border-color: darken(.05, ${props.theme.colors.orange});
    color: #fff;

    &:hover {
      background-color: ${darken(.1, props.theme.colors.orange)};
      border-color: ${darken(.15, props.theme.colors.orange)};
      color: #fff;
    }
  `}

  ${props => props.variant === 'danger' && `
    background-color: ${props.theme.colors.danger};
    border-color: darken(.05, ${props.theme.colors.danger});
    color: #fff;

    &:hover {
      background-color: ${darken(.1, props.theme.colors.danger)};
      border-color: ${darken(.15, props.theme.colors.danger)};
      color: #fff;
    }
  `}

  ${props => props.variant === 'link' && `
    background-color: transparent;
    border-color: none;

    &:hover {
      color: ${props.theme.colors.lightGrey};
      text-decoration: underline;
    }
  `}
`)

const variations = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'];

StyledButton.propTypes = {
  ...propTypes.space,
  variant: PropTypes.oneOf(variations)
}

StyledButton.defaultProps = {
  variant: 'default'
}

StyledButton.displayName = 'Button'

export default StyledButton