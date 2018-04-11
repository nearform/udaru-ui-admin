import React from 'react'
import renderer from 'react-test-renderer'
import Team from 'team'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import theme from '../lib/components/theme'

expect.addSnapshotSerializer(createSerializer(emotion))

it('should render with default props', () => {
  const component = renderer.create(
    <Team
      theme={theme}
      name="Team Name"
      description="My Team Description"
      organizationId="my-org-id"
      usersCount={100}
    />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
