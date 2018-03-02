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

it('should render with default props', done => {
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

  process.nextTick(() => {
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()

    global.fetch.mockRestore()
    done()
  })
})

it('should render with parent id set', done => {
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

  process.nextTick(() => {
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
    global.fetch.mockRestore()
    done()
  })
})

it('should call onViewParent when button is pressed', done => {
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

  process.nextTick(() => {
    const btn = component.root.findAllByType('button')
    btn[0].props.onClick()

    expect(onViewParent).toHaveBeenCalled()
    expect(onViewParent).toHaveBeenCalledWith('1')

    global.fetch.mockRestore()
    done()
  })
})

it('should load data successfully', done => {
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

  process.nextTick(() => {
    const { loading, error, team } = instance.state

    expect(loading).toBeFalsy()
    expect(error).toBeNull()
    expect(team).toBe(teamData)

    global.fetch.mockRestore()
    done()
  })
})

it('should handle error when loading data', done => {
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

  process.nextTick(() => {
    const { loading, error, team } = instance.state

    expect(loading).toBeFalsy()
    expect(error).toBeDefined()
    expect(error.message).toBe('there was an error loading team details.')
    expect(team).toBeNull()

    global.fetch.mockRestore()
    done()
  })
})

it('component should reject all running promises when unmounting component', done => {
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

  component.unmount()

  process.nextTick(() => {
    const { _runningPromises } = instance

    expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()

    global.fetch.mockRestore()
    done()
  })
})

it('should NOT refetch teams if ids are same on re-render', done => {
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

  process.nextTick(() => {
    const { loading, team } = instance.state

    expect(loading).toBeFalsy()
    expect(team).toBe(teamData)

    component.update(
      <ViewTeam
        udaruUrl="my-udaru-url"
        authorization="my-authorization"
        org="my-org"
        id="1"
      />
    )

    process.nextTick(() => {
      const { _runningPromises } = instance
      const { loading, team } = instance.state

      expect(loading).toBeFalsy()
      expect(team).toBe(teamData)
      expect(_runningPromises.length).toBe(1)

      global.fetch.mockRestore()
      done()
    })
  })
})

it('SHOULD refetch teams if ids are same on re-render', done => {
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

  process.nextTick(() => {
    const { loading, team } = instance.state

    expect(loading).toBeFalsy()
    expect(team).toBe(teamData)

    component.update(
      <ViewTeam
        udaruUrl="my-udaru-url"
        authorization="my-authorization"
        org="my-org"
        id="2"
      />
    )

    process.nextTick(() => {
      const { _runningPromises } = instance
      const { loading } = instance.state

      expect(loading).toBeTruthy()
      expect(_runningPromises.length).toBe(2)

      global.fetch.mockRestore()
      done()
    })
  })
})
