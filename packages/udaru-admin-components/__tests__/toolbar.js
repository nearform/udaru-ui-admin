import React from 'react'
import renderer from 'react-test-renderer'
import Toolbar from 'toolbar'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import theme from '../lib/components/theme'

expect.addSnapshotSerializer(createSerializer(emotion))

it('should render with default props', () => {
  const component = renderer.create(<Toolbar theme={theme} />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render with disable props', () => {
  const component = renderer.create(
    <Toolbar
      theme={theme}
      disableView={false}
      disableUpdate={false}
      disableDelete={false}
    />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
