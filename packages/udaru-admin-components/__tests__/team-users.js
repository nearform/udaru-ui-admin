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

it('should render correctly', () => {
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
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should load users correctly', done => {
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

  process.nextTick(() => {
    const { loading, users } = instance.state

    expect(loading).toBeFalsy()
    expect(users).toEqual(userData)

    global.fetch.mockRestore()
    done()
  })
})

it('should handle loading error', done => {
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

  process.nextTick(() => {
    const { loading, error } = instance.state

    expect(loading).toBeFalsy()
    expect(error).toEqual(new Error('error loading the team users.'))

    global.fetch.mockRestore()
    done()
  })
})

it('should handle component unmount with running promises', done => {
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
  component.unmount()

  process.nextTick(() => {
    const { _runningPromises } = instance

    expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()

    global.fetch.mockRestore()
    done()
  })
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
})
