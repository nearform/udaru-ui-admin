import React from 'react'
import renderer from 'react-test-renderer'
import TeamsTable from 'teams-table'
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

it('should render with props', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  await instance.componentDidMount()
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  global.fetch.mockRestore()
})

it('should render with error state', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance

  await instance.componentDidMount()

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should render create team', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  await instance.componentDidMount()

  expect(instance.state.view).toBe('LIST')
  instance.onCreate()
  expect(instance.state.view).toBe('CREATE')

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should render view team', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance

  expect(instance.state.view).toBe('LIST')
  await instance.setState({
    selectedRow: {
      id: '1'
    }
  })
  await instance.onView()
  expect(instance.state.view).toBe('READ')

  global.fetch.mockRestore()
})

it('should render view team', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance

  expect(instance.state.view).toBe('LIST')

  await instance.onNestedView('1', '2')

  expect(instance.state.view).toBe('READ')
  expect(instance.state.viewId).toBe('2')
  expect(instance.state.parentTeamId).toBe('1')

  global.fetch.mockRestore()
})

it('should render view parent team', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance

  expect(instance.state.view).toBe('LIST')

  await instance.onViewParent('1')

  expect(instance.state.view).toBe('READ')
  expect(instance.state.viewId).toBe('1')
  expect(instance.state.parentTeamId).toBeNull()

  global.fetch.mockRestore()
})

it('should render update team', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  await instance.componentDidMount()

  expect(instance.state.view).toBe('LIST')

  instance.setState({
    selectedRow: {
      id: '1',
      name: 'Team Name',
      description: 'Team Description'
    }
  })
  instance.onUpdate()

  expect(instance.state.view).toBe('UPDATE')

  const json = component.toJSON()

  expect(json).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should render delete team', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  await instance.componentDidMount()

  expect(instance.state.view).toBe('LIST')

  instance.setState({
    selectedRow: {
      id: '1',
      name: 'Team Name',
      description: 'Team Description'
    }
  })

  await instance.onDelete()
  expect(instance.state.view).toBe('DELETE')

  const json = component.toJSON()
  expect(json).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should render error in unknown state', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  await component.getInstance().componentDidMount()

  expect(instance.state.view).toBe('LIST')

  await instance.setState({
    view: 'IDONTKNOWTHISSTATE'
  })

  const json = component.toJSON()
  expect(json).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should render create and then go back to list and clear selectedRow', async () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  expect(instance.state.view).toBe('LIST')

  instance.setState({
    selectedRow: {
      id: '1',
      name: 'Team Name',
      description: 'Team Description'
    }
  })
  instance.onCreate()
  expect(instance.state.view).toBe('CREATE')
  await instance.onCancel()

  expect(instance.state.view).toBe('LIST')
  expect(instance.state.selectedRow).toBeNull()
  global.fetch.mockRestore()
})

it('should reset search change if text is blank', () => {
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

  const component = renderer.create(<TeamsTable theme={theme} />)
  const instance = component.root.instance
  instance.setState({
    originalData: [{ id: '1' }],
    originalDataTotalSize: 1
  })

  instance.onSearchChange('')
  expect(instance.state.data).toEqual([{ id: '1' }])
  expect(instance.state.dataTotalSize).toEqual(1)

  global.fetch.mockRestore()
})

it('should search for value', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data: [{ id: '2' }],
              total: 1
            }
          }
        })
      })
  )

  const component = renderer.create(
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance

  await instance.onSearchChange('team')

  expect(instance.state.data).toEqual([{ id: '2' }])
  expect(instance.state.dataTotalSize).toEqual(1)

  global.fetch.mockRestore()
})

it('should search handle malformed response', () => {
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
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance

  instance.onSearchChange('team')

  expect(instance.state.data).toEqual([])
  expect(instance.state.dataTotalSize).toEqual(0)

  global.fetch.mockRestore()
})

it('should handle error response', async () => {
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
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance
  const data = [{ id: 1 }]
  const totalSize = 1

  instance.setState({
    originalData: data,
    originalDataTotalSize: totalSize
  })

  await instance.onSearchChange('team')

  expect(instance.state.data).toEqual(data)
  expect(instance.state.dataTotalSize).toEqual(totalSize)

  global.fetch.mockRestore()
})

it('should handle select row', () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data: [{ id: '2' }],
              total: 1
            }
          }
        })
      })
  )

  const component = renderer.create(
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance

  instance.onSelect('row-1')
  expect(instance.state.selectedRow).toBe('row-1')

  global.fetch.mockRestore()
})

it('should handle page change', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data: [{ id: '2' }],
              total: 1
            }
          }
        })
      })
  )

  const component = renderer.create(
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance

  await instance.onPageChange(1, 1)

  expect(global.fetch.mock.calls[1][0]).toBe(
    '/authorization/teams?page=1&limit=1'
  )

  global.fetch.mockRestore()
})

it('should handle page list change', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data: [{ id: '2' }],
              total: 1
            }
          }
        })
      })
  )

  const component = renderer.create(
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance

  await instance.onSizePerPageList(22)

  expect(global.fetch.mock.calls[1][0]).toBe(
    '/authorization/teams?page=1&limit=22'
  )

  global.fetch.mockRestore()
})

it('should reject all running promises', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {
              data: [{ id: '2' }],
              total: 1
            }
          }
        })
      })
  )

  const component = renderer.create(
    <TeamsTable
      theme={theme}
      authorization={'my-authorization'}
      org={'my-org'}
    />
  )
  const instance = component.root.instance
  await component.unmount()

  const { _runningPromises } = instance

  expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()

  global.fetch.mockRestore()
})
