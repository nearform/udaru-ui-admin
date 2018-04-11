import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import withProps from 'recompose/withProps'
import { space, propTypes } from 'styled-system'
// This component adds in custom themeable styling to the React Tabs component
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel
} from 'react-tabs'

const Tab = withProps({
  selectedClassName: 'selected',
  disabledClassName: 'disabled'
})(styled(UnstyledTab)`
  display: inline-block;
  border: 1px solid transparent;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;

  &.selected {
    background: #fff;
    border-color: #aaa;
    color: black;
    border-radius: 5px 5px 0 0;
  }

  &.disabled {
    color: GrayText;
    cursor: default;
  }

  &:focus {
    box-shadow: 0 0 5px hsl(208, 99%, 50%);
    border-color: hsl(208, 99%, 50%);
    outline: none;
  }

  &:focus:after {
    content: "";
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: #fff;
  }
`)

const Tabs = styled(UnstyledTabs)`
  // Put custom style here, e.g. space from styled-system to allow atomic control
  ${space};
`

const TabList = styled(UnstyledTabList)`
  border-bottom: 1px solid #aaa;
  margin: 0 0 10px;
  padding: 0;
`

const TabPanel = withProps({ selectedClassName: 'selected' })(styled(UnstyledTabPanel)`
  display: none;

  &.selected {
    display: block;
  }
`)

Tab.displayName = 'Tab'
Tabs.displayName = 'Tabs'
TabList.displayName = 'TabList'
TabPanel.displayName = 'TabPanel'

Tab.propTypes = UnstyledTab.propTypes
Tabs.propTypes = { ...propTypes.space, ...UnstyledTabs.propTypes }
TabList.propTypes = UnstyledTabList.propTypes
TabPanel.propTypes = UnstyledTabPanel.propTypes

Tab.tabsRole = 'Tab'
Tabs.tabsRole = 'Tabs'
TabPanel.tabsRole = 'TabPanel'
TabList.tabsRole = 'TabList'

export { Tab, TabList, Tabs, TabPanel }
