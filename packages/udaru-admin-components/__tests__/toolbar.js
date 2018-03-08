import React from 'react'
import renderer from 'react-test-renderer'
import Toolbar from 'toolbar'

it('should render with default props', () => {
  const component = renderer.create(<Toolbar />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should render with disable props', () => {
  const component = renderer.create(
    <Toolbar disableView={false} disableUpdate={false} disableDelete={false} />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
