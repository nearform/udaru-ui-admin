import React from 'react'
import renderer from 'react-test-renderer'
import TeamsTable from 'teams-table'

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

it('should render with props', done => {
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

  const component = renderer.create(<TeamsTable />)
  process.nextTick(() => {
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    global.fetch.mockRestore()
    done()
  })
})

it('should render with error state', done => {
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

  const component = renderer.create(<TeamsTable />)
  process.nextTick(() => {
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    global.fetch.mockRestore()
    done()
  })
})

it('should render create team', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')
    instance.onCreate()
    expect(instance.state.view).toBe('CREATE')

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    global.fetch.mockRestore()
    done()
  })
})

it('should render view team', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')
    instance.setState({
      selectedRow: {
        id: '1'
      }
    })
    instance.onView()
    expect(instance.state.view).toBe('READ')

    global.fetch.mockRestore()
    done()
  })
})

it('should render view team', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')

    instance.onNestedView('1', '2')

    expect(instance.state.view).toBe('READ')
    expect(instance.state.viewId).toBe('2')
    expect(instance.state.parentTeamId).toBe('1')

    global.fetch.mockRestore()
    done()
  })
})

it('should render view parent team', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')

    instance.onViewParent('1')

    expect(instance.state.view).toBe('READ')
    expect(instance.state.viewId).toBe('1')
    expect(instance.state.parentTeamId).toBeNull()

    global.fetch.mockRestore()
    done()
  })
})

it('should render update team', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
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

    process.nextTick(() => {
      const json = component.toJSON()

      expect(json).toMatchSnapshot()

      global.fetch.mockRestore()
      done()
    })
  })
})

it('should render delete team', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')

    instance.setState({
      selectedRow: {
        id: '1',
        name: 'Team Name',
        description: 'Team Description'
      }
    })
    instance.onDelete()

    expect(instance.state.view).toBe('DELETE')

    process.nextTick(() => {
      const json = component.toJSON()

      expect(json).toMatchSnapshot()

      global.fetch.mockRestore()
      done()
    })
  })
})

it('should render error in unknown state', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')

    instance.setState({
      view: 'IDONTKNOWTHISSTATE'
    })

    process.nextTick(() => {
      const json = component.toJSON()

      expect(json).toMatchSnapshot()

      global.fetch.mockRestore()
      done()
    })
  })
})

it('should render create and then go back to list and clear selectedRow', done => {
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

  const component = renderer.create(<TeamsTable />)
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
  instance.onCancel()

  process.nextTick(() => {
    expect(instance.state.view).toBe('LIST')
    expect(instance.state.selectedRow).toBeNull()
    global.fetch.mockRestore()
    done()
  })
})

it('should reset search change if text is blank', done => {
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

  const component = renderer.create(<TeamsTable />)
  const instance = component.root.instance
  instance.setState({
    originalData: [{ id: '1' }],
    originalDataTotalSize: 1
  })

  instance.onSearchChange('')
  expect(instance.state.data).toEqual([{ id: '1' }])
  expect(instance.state.dataTotalSize).toEqual(1)

  global.fetch.mockRestore()
  done()
})

it('should search for value', done => {
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
  )
  const instance = component.root.instance

  instance.onSearchChange('team')

  process.nextTick(() => {
    expect(instance.state.data).toEqual([{ id: '2' }])
    expect(instance.state.dataTotalSize).toEqual(1)

    global.fetch.mockRestore()
    done()
  })
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
  )
  const instance = component.root.instance

  instance.onSearchChange('team')

  expect(instance.state.data).toEqual([])
  expect(instance.state.dataTotalSize).toEqual(0)

  global.fetch.mockRestore()
})

it('should handle error response', done => {
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
  )
  const instance = component.root.instance
  const data = [{ id: 1 }]
  const totalSize = 1

  instance.setState({
    originalData: data,
    originalDataTotalSize: totalSize
  })

  instance.onSearchChange('team')

  process.nextTick(() => {
    expect(instance.state.data).toEqual(data)
    expect(instance.state.dataTotalSize).toEqual(totalSize)

    global.fetch.mockRestore()

    done()
  })
})

it('should handle select row', done => {
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
  )
  const instance = component.root.instance

  instance.onSelect('row-1')
  expect(instance.state.selectedRow).toBe('row-1')

  global.fetch.mockRestore()
  done()
})

it('should handle page change', done => {
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
  )
  const instance = component.root.instance

  instance.onPageChange(1, 1)
  process.nextTick(() => {
    expect(global.fetch.mock.calls[1][0]).toBe(
      '/authorization/teams?page=1&limit=1'
    )

    global.fetch.mockRestore()
    done()
  })
})

it('should handle page list change', done => {
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
  )
  const instance = component.root.instance

  instance.onSizePerPageList(22)
  process.nextTick(() => {
    expect(global.fetch.mock.calls[1][0]).toBe(
      '/authorization/teams?page=1&limit=22'
    )

    global.fetch.mockRestore()
    done()
  })
})

it('should reject all running promises', done => {
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
    <TeamsTable authorization={'my-authorization'} org={'my-org'} />
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
