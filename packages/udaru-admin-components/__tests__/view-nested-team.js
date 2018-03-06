import React from 'react'
import renderer from 'react-test-renderer'
import ViewNestedTeam from 'view-nested-team'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import theme from '../lib/components/theme'

expect.addSnapshotSerializer(createSerializer(emotion))

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
              data: [],
              total: 0
            }
          }
        })
      })
  )
  const component = renderer.create(<ViewNestedTeam theme={theme} />)
  const instance = component.root.instance
  await instance.componentDidMount()

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should load data successfully', async () => {
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
      theme={theme}
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      parentTeamId="1"
      currentPage={1}
      limit="5"
    />
  )
  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()
  await instance.componentDidMount()

  expect(global.fetch.mock.calls[0][0]).toEqual(
    'my-udaru-url/authorization/teams/1/nested?page=1&limit=5'
  )
  expect(global.fetch.mock.calls[0][1]).toEqual({
    headers: {
      authorization: 'my-authorization',
      org: 'my-org'
    }
  })
  expect(instance.state.loading).toBeFalsy()
  expect(instance.state.data).toBe(data)
  expect(instance.state.total).toBe(1)
  expect(instance.state.error).toBeNull()

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
    <ViewNestedTeam
      theme={theme}
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      parentTeamId="1"
      currentPage={1}
      limit="5"
    />
  )
  const instance = component.root.instance

  expect(instance.state.loading).toBeTruthy()
  await instance.componentDidMount()

  expect(instance.state.loading).toBeFalsy()
  expect(instance.state.data).toEqual([])
  expect(instance.state.total).toBe(0)
  expect(instance.state.error).toBeDefined()
  expect(instance.state.error.message).toBe('there was an error loading team.')

  global.fetch.mockRestore()
})

it('should cancel all promises running when component is unmounted', async () => {
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
      theme={theme}
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      parentTeamId="1"
      currentPage={1}
      limit="5"
    />
  )
  const instance = component.root.instance

  await component.unmount()

  const { _runningPromises } = instance

  expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()

  global.fetch.mockRestore()
})
