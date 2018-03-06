import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import ThemeProvider from '../lib/components/ThemeProvider'

addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>)

// automatically import all files ending in *.stories.js
const req = require.context('../lib', true, /\.stories.jsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
