import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Tab, Tabs, TabList, TabPanel } from './'

const description = `
  This component is based on [React Tabs](https://github.com/reactjs/react-tabs) and has been wrapped so that we can style is according to a theme. Styled-System is in place for adding margin and padding to the \`Tabs\` container.


  In \`Tabs\` the \`onSelect\` prop is only required, and should be a function, if \`selectedIndex\` is given. Otherwise it is not required.
`


storiesOf('Components/Tabs', module)
  .add(
    'Tabs component',
    withInfo({
      inline: true,
      text: description
    })(() => (
      <Tabs m={4}>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    ))
  )
  .add('with default index set', () => (
    <Tabs defaultIndex={1} m={4}>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab>Selected tab</Tab>
      </TabList>
      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
  ))
  .add('with disabled tab', () => (
    <Tabs m={4}>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab disabled>Disabled tab</Tab>
        <Tab>Title 3</Tab>
      </TabList>
      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 3</h2>
      </TabPanel>
    </Tabs>
  ))


  
  