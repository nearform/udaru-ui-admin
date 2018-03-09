import React from 'react'
import renderer from 'react-test-renderer'
import TeamUsers from 'team-users'

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

it('should render correctly', async () => {
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
  const component = renderer.create(<TeamUsers />)
  const instance = component.root.instance
  await instance.setStateAsync({
    loading: false,
    users: {
      data: [{ id: 'MyUserId', name: 'My User Id' }],
      total: 1
    }
  })
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should load users correctly', async () => {
  const userData = {
    data: [{ id: 2, name: 'two' }],
    total: 1
  }
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return userData
          }
        })
      })
  )

  const component = renderer.create(<TeamUsers />)
  const instance = component.root.instance
  expect(instance.state.loading).toBeTruthy()

  await instance.componentDidMount()

  const { loading, users } = instance.state

  expect(loading).toBeFalsy()
  expect(users).toEqual(userData)

  global.fetch.mockRestore()
})

it('should handle loading error', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: false,
          json: function() {
            return {
              data: [],
              total: 0
            }
          }
        })
      })
  )
  const component = renderer.create(<TeamUsers />)
  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()

  await instance.componentDidMount()

  const { loading, error } = instance.state

  expect(loading).toBeFalsy()
  expect(error).toEqual(new Error('error loading the team users.'))

  global.fetch.mockRestore()
})

it('should handle component unmount with running promises', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: false,
          json: function() {
            return {
              data: [],
              total: 0
            }
          }
        })
      })
  )
  const component = renderer.create(<TeamUsers />)
  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()
  await component.unmount()

  const { _runningPromises } = instance

  expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()

  global.fetch.mockRestore()
})

it('should handle page change', () => {
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
  const component = renderer.create(<TeamUsers id={1} />)
  const instance = component.root.instance

  instance.fetchTeamUsers = jest.fn()

  instance.onPageChange(2, 10)

  expect(instance.fetchTeamUsers.mock.calls[0]).toEqual([1, 2, 10])
  global.fetch.mockRestore()
})

it('should handle size per page change', () => {
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
  const component = renderer.create(<TeamUsers id={1} />)
  const instance = component.root.instance

  instance.fetchTeamUsers = jest.fn()

  instance.onSizePerPageList(100)

  expect(instance.fetchTeamUsers.mock.calls[0][2]).toEqual(100)
  global.fetch.mockRestore()
})

it('should search for a user', async () => {
  const data = {
    data: [{ id: 'Search Result ID', name: 'Search Result Name' }],
    total: 1
  }

  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return data
          }
        })
      })
  )

  const component = renderer.create(<TeamUsers id={1} />)
  const instance = component.root.instance
  await instance.setStateAsync({
    loading: false,
    users: {
      data: [{ id: 'MyUserId', name: 'My User Id' }],
      total: 1
    }
  })

  await instance.onSearchChange('search')

  expect(instance.state.users).toEqual(data)
  global.fetch.mockRestore()
})

it('should reset back to original users on empty search', async () => {
  const data = {
    data: [{ id: 'Original ID', name: 'Original Name' }],
    total: 1
  }

  const searchData = {
    data: [{ id: 'Search ID', name: 'Search Name' }],
    total: 1
  }

  global.fetch = jest.fn().mockImplementation(url => {
    if (!url.includes('teams/1/users?page=1&limit=5')) {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return searchData
          }
        })
      })
    }
  })

  const component = renderer.create(<TeamUsers id={1} />)
  const instance = component.root.instance

  await instance.setStateAsync({
    loading: false,
    users: data,
    originalUsers: data
  })

  await instance.onSearchChange('some search query')
  expect(instance.state.users).toEqual(searchData)

  await instance.onSearchChange('')
  expect(instance.state.users).toEqual(data)

  global.fetch.mockRestore()
})

it('should reset back to original users on error search', async () => {
  const data = {
    data: [{ id: 'Original ID', name: 'Original Name' }],
    total: 1
  }

  global.fetch = jest.fn().mockImplementation(url => {
    if (!url.includes('teams/1/users?page=1&limit=5')) {
      return new Promise((resolve, reject) => {
        resolve({
          ok: false,
          json: function() {
            return {
              data: [{ id: 'Search ID', name: 'Search Name' }],
              total: 1
            }
          }
        })
      })
    }
  })

  const component = renderer.create(<TeamUsers id={1} />)
  const instance = component.root.instance

  await instance.setStateAsync({
    loading: false,
    users: data,
    originalUsers: data
  })

  await instance.onSearchChange('some search query')
  expect(instance.state.users).toEqual(data)

  global.fetch.mockRestore()
})
