import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

function loadStories() {
  require('../stories/index.js')
}

addDecorator((story, context) => withInfo()(story)(context))
configure(loadStories, module)
