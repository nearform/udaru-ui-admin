import React from 'react'
import renderer from 'react-test-renderer'
import Team from 'team'

it('should render with default props', () => {
  const component = renderer.create(
    <Team
      name="Team Name"
      description="My Team Description"
      organizationId="my-org-id"
      usersCount={100}
    />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
