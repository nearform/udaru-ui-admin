import React from 'react'
import renderer from 'react-test-renderer'
import ViewTeam from 'view-team'

jest.mock('react-bootstrap-table', () => {
  return {
    BootstrapTable: props => {
      return (
        <table>
          {' // mocked table output'}
          {props.children}
        </table>
      )
    },
    TableHeaderColumn: props => {
      return (
        <tr>
          <th>{props.dataField + ' // mocked table header column'}</th>
        </tr>
      )
    }
  }
})

it('should render with default props', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              name: 'Team',
              description: 'Team Description',
              organizationId: 'WONKA',
              usersCount: 100
            }
          }
        })
      })
  )

  const component = renderer.create(<ViewTeam />)
  const instance = component.root.instance

  await instance.componentDidMount()
  await new Promise(resolve => process.nextTick(resolve))

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should render with parent id set', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data: [],
              total: 0
            }
          }
        })
      })
  )
  const component = renderer.create(
    <ViewTeam onViewParent={jest.fn()} parentTeamId="1" />
  )
  const instance = component.root.instance
  await instance.componentDidMount()
  await new Promise(resolve => process.nextTick(resolve))

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
  global.fetch.mockRestore()
})

it('should call onViewParent when button is pressed', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {}
          }
        })
      })
  )
  const onViewParent = jest.fn()
  const component = renderer.create(
    <ViewTeam onViewParent={onViewParent} parentTeamId="1" />
  )
  const instance = component.root.instance
  await instance.componentDidMount()

  const btn = component.root.findAllByType('button')
  btn[0].props.onClick()

  expect(onViewParent).toHaveBeenCalled()
  expect(onViewParent).toHaveBeenCalledWith('1')

  global.fetch.mockRestore()
})

it('should load data successfully', async () => {
  const teamData = {
    id: '1',
    name: 'Admins',
    description: 'Administrators of the Authorization System',
    path: '1',
    organizationId: 'WONKA',
    users: [
      {
        id: 'AugustusId',
        name: 'Augustus Gloop'
      }
    ],
    policies: [
      {
        id: 'policyId1',
        name: 'Director',
        version: '0.1',
        variables: {}
      }
    ],
    usersCount: 1
  }
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return teamData
          }
        })
      })
  )

  const component = renderer.create(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="1"
    />
  )

  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()

  expect(global.fetch.mock.calls[0][0]).toBe(
    'my-udaru-url/authorization/teams/1'
  )
  expect(global.fetch.mock.calls[0][1]).toEqual({
    headers: {
      authorization: 'my-authorization',
      org: 'my-org'
    }
  })
  await new Promise(resolve => process.nextTick(resolve))

  const { loading, error, team } = instance.state

  expect(loading).toBeFalsy()
  expect(error).toBeNull()
  expect(team).toBe(teamData)

  global.fetch.mockRestore()
})

it('should handle error when loading data', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: false,
          json: function() {
            return {}
          }
        })
      })
  )

  const component = renderer.create(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="1"
    />
  )

  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()

  await instance.componentDidMount()

  const { loading, error, team } = instance.state

  expect(loading).toBeFalsy()
  expect(error).toBeDefined()
  expect(error.message).toBe('there was an error loading team details.')
  expect(team).toBeNull()

  global.fetch.mockRestore()
})

it('component should reject all running promises when unmounting component', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {}
          }
        })
      })
  )

  const component = renderer.create(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="1"
    />
  )

  const instance = component.root.instance

  await component.unmount()

  expect(instance._runningPromises.every(p => p.hasCanceled())).toBeTruthy()

  global.fetch.mockRestore()
})

it('should NOT refetch teams if ids are same on re-render', async () => {
  const teamData = { id: '1' }
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return teamData
          }
        })
      })
  )

  const component = renderer.create(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="1"
    />
  )
  const instance = component.root.instance
  await new Promise(resolve => process.nextTick(resolve))

  expect(instance.state.loading).toBeFalsy()
  expect(instance.state.team).toBe(teamData)

  await component.update(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="1"
    />
  )

  expect(instance.state.loading).toBeFalsy()
  expect(instance.state.team).toBe(teamData)
  expect(instance._runningPromises.length).toBe(1)

  global.fetch.mockRestore()
})

it('SHOULD refetch teams if ids are same on re-render', async () => {
  const teamData = { id: '1' }
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return teamData
          }
        })
      })
  )

  const component = renderer.create(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="1"
    />
  )
  const instance = component.root.instance
  await new Promise(resolve => process.nextTick(resolve))

  expect(instance.state.loading).toBeFalsy()
  expect(instance.state.team).toBe(teamData)

  await component.update(
    <ViewTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="2"
    />
  )

  expect(instance.state.loading).toBeTruthy()
  expect(instance._runningPromises.length).toBe(2)

  global.fetch.mockRestore()
})
