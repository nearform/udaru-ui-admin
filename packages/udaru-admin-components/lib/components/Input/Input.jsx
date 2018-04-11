import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { space, propTypes } from 'styled-system'
import theme from '../theme'

const Input = (props) => {
  return (
    <input {...props} />
  )
}


const StyledInput = styled(Input)`
  appearance: none;
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  ${space};

  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }

  .success & {
    border-color: #3c763d;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);

    &:focus {
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(60,118,61,.6);
    }
  }

  .error & {
    border-color: #a94442;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);

    &:focus {
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(169,68,66,.6);
    }
  }

  &[disabled] {
    border: 1px solid #ddd;
    cursor: not-allowed;
    background-color: #eee;

    &::placeholder {
      color: #aaa;
    }
  }

  &::placeholder {
    color: #aaa;

    .success & {
      color: rgba(60,118,61,.4);
    }

    .error & {
      color: rgba(169,68,66,.4);
    }
  }

  &::-ms-clear {
    display: none;
  }
`

StyledInput.displayName = 'Input'

StyledInput.propTypes = {
  ...propTypes.space,
  id: PropTypes.string
}

StyledInput.defaultProps = {
  theme: theme
}

export default StyledInput
