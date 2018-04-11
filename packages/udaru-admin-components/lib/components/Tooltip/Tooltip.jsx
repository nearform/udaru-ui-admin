import React from 'react'
import PropTypes from 'prop-types'
/* Based on RC Tooltip: https://www.npmjs.com/package/rc-tooltip */
import RCTooltip from 'rc-tooltip'
import styled from 'react-emotion'


const Tooltip = ({children, className, overlay, placement, trigger}) => {
  return (
    <RCTooltip
      overlay={overlay}
      overlayClassName={className}
      placement={placement}
      trigger={trigger}
    >
      {children}
    </RCTooltip>
  )
}

const StyledTooltip = styled(Tooltip)`
  position: absolute;
  z-index: 1070;
  display: block;
  visibility: visible;
  line-height: 1.5;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1px;
  opacity: 0.9;

  &.rc-tooltip-hidden {
    display: none;
  }
  .rc-tooltip-inner {
    padding: 8px 10px;
    color: #333333;
    text-align: left;
    text-decoration: none;
    background-color: #ffffff;
    border-radius: 3px;
    min-height: 34px;
    border: 1px solid #b1b1b1;
  }
  .rc-tooltip-arrow,
  .rc-tooltip-arrow-inner {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  &.rc-tooltip-placement-top .rc-tooltip-arrow,
  &.rc-tooltip-placement-topLeft .rc-tooltip-arrow,
  &.rc-tooltip-placement-topRight .rc-tooltip-arrow {
    bottom: -5px;
    margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #b1b1b1;
  }
  &.rc-tooltip-placement-top .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-topLeft .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-topRight .rc-tooltip-arrow-inner {
    bottom: 1px;
    margin-left: -6px;
    border-width: 6px 6px 0;
    border-top-color: #ffffff;
  }
  &.rc-tooltip-placement-top .rc-tooltip-arrow {
    left: 50%;
  }
  &.rc-tooltip-placement-topLeft .rc-tooltip-arrow {
    left: 15%;
  }
  &.rc-tooltip-placement-topRight .rc-tooltip-arrow {
    right: 15%;
  }
  &.rc-tooltip-placement-right .rc-tooltip-arrow,
  &.rc-tooltip-placement-rightTop .rc-tooltip-arrow,
  &.rc-tooltip-placement-rightBottom .rc-tooltip-arrow {
    left: -5px;
    margin-top: -6px;
    border-width: 6px 6px 6px 0;
    border-right-color: #b1b1b1;
  }
  &.rc-tooltip-placement-right .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-rightTop .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-rightBottom .rc-tooltip-arrow-inner {
    left: 1px;
    margin-top: -6px;
    border-width: 6px 6px 6px 0;
    border-right-color: #ffffff;
  }
  &.rc-tooltip-placement-right .rc-tooltip-arrow {
    top: 50%;
  }
  &.rc-tooltip-placement-rightTop .rc-tooltip-arrow {
    top: 15%;
    margin-top: 0;
  }
  &.rc-tooltip-placement-rightBottom .rc-tooltip-arrow {
    bottom: 15%;
  }
  &.rc-tooltip-placement-left .rc-tooltip-arrow,
  &.rc-tooltip-placement-leftTop .rc-tooltip-arrow,
  &.rc-tooltip-placement-leftBottom .rc-tooltip-arrow {
    right: -5px;
    margin-top: -6px;
    border-width: 6px 0 6px 6px;
    border-left-color: #b1b1b1;
  }
  &.rc-tooltip-placement-left .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-leftTop .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-leftBottom .rc-tooltip-arrow-inner {
    right: 1px;
    margin-top: -6px;
    border-width: 6px 0 6px 6px;
    border-left-color: #ffffff;
  }
  &.rc-tooltip-placement-left .rc-tooltip-arrow {
    top: 50%;
  }
  &.rc-tooltip-placement-leftTop .rc-tooltip-arrow {
    top: 15%;
    margin-top: 0;
  }
  &.rc-tooltip-placement-leftBottom .rc-tooltip-arrow {
    bottom: 15%;
  }
  &.rc-tooltip-placement-bottom .rc-tooltip-arrow,
  &.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow,
  &.rc-tooltip-placement-bottomRight .rc-tooltip-arrow {
    top: -5px;
    margin-left: -6px;
    border-width: 0 6px 6px;
    border-bottom-color: #b1b1b1;
  }
  &.rc-tooltip-placement-bottom .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow-inner,
  &.rc-tooltip-placement-bottomRight .rc-tooltip-arrow-inner {
    top: 1px;
    margin-left: -6px;
    border-width: 0 6px 6px;
    border-bottom-color: #ffffff;
  }
  &.rc-tooltip-placement-bottom .rc-tooltip-arrow {
    left: 50%;
  }
  &.rc-tooltip-placement-bottomLeft .rc-tooltip-arrow {
    left: 15%;
  }
  &.rc-tooltip-placement-bottomRight .rc-tooltip-arrow {
    right: 15%;
  }
`

StyledTooltip.propTypes = {
  placement: PropTypes.string,
  overlay: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  trigger: PropTypes.array // eg ['click']
}

StyledTooltip.displayName = 'Tooltip'

export default StyledTooltip