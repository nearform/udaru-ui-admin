import React from 'react'
import renderer from 'react-test-renderer'
import ViewNestedTeam from 'view-nested-team'

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
              data: [],
              total: 0
            }
          }
        })
      })
  )
  const component = renderer.create(<ViewNestedTeam />)

  process.nextTick(() => {
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()

    global.fetch.mockRestore()
    done()
  })
})

it('should load data successfully', done => {
  const data = [{ id: 1 }]
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data,
              total: 1
            }
          }
        })
      })
  )
  const component = renderer.create(
    <ViewNestedTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      parentTeamId="1"
      currentPage="1"
      limit="5"
    />
  )
  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()

  process.nextTick(() => {
    const { loading, data, total, error } = instance.state
    expect(global.fetch.mock.calls[0][0]).toEqual(
      'my-udaru-url/authorization/teams/1/nested?page=1&limit=5'
    )
    expect(global.fetch.mock.calls[0][1]).toEqual({
      headers: {
        authorization: 'my-authorization',
        org: 'my-org'
      }
    })
    expect(loading).toBeFalsy()
    expect(data).toBe(data)
    expect(total).toBe(1)
    expect(error).toBeNull()

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
    <ViewNestedTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      parentTeamId="1"
      currentPage="1"
      limit="5"
    />
  )
  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()

  process.nextTick(() => {
    const { loading, data, total, error } = instance.state

    expect(loading).toBeFalsy()
    expect(data).toEqual([])
    expect(total).toBe(0)
    expect(error).toBeDefined()
    expect(error.message).toBe('there was an error loading team.')

    global.fetch.mockRestore()
    done()
  })
})

it('should cancel all promises running when component is unmounted', done => {
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
    <ViewNestedTeam
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      parentTeamId="1"
      currentPage="1"
      limit="5"
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
