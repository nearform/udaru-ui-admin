import React from 'react'
import renderer from 'react-test-renderer'
import TeamsPoliciesMapper, { sort, mapPolicies } from 'teams-policies-mapper'
const teamPolicies = {
  id: '1',
  name: 'Admins',
  description: 'Administrators of the Authorization System',
  path: '1',
  organizationId: 'WONKA',
  users: [{ id: 'AugustusId', name: 'Augustus Gloop' }],
  policies: [
    { id: 'policyId1', name: 'Director', version: '0.1', variables: {} }
  ],
  usersCount: 1
}
const allPolicies = {
  page: 1,
  limit: 100,
  total: 15,
  data: [
    {
      id: 'policyId2',
      version: '0.1',
      name: 'Accountant',
      statements: {
        Statement: [
          {
            Action: ['finance:ReadBalanceSheet'],
            Effect: 'Allow',
            Resource: ['database:pg01:balancesheet']
          },
          {
            Action: ['finance:ImportBalanceSheet'],
            Effect: 'Deny',
            Resource: ['database:pg01:balancesheet']
          },
          {
            Action: ['finance:ReadCompanies'],
            Effect: 'Deny',
            Resource: ['database:pg01:companies']
          },
          {
            Action: ['finance:UpdateCompanies'],
            Effect: 'Deny',
            Resource: ['database:pg01:companies']
          },
          {
            Action: ['finance:DeleteCompanies'],
            Effect: 'Deny',
            Resource: ['database:pg01:companies']
          }
        ]
      }
    },

    {
      id: 'policyId1',
      version: '0.1',
      name: 'Director',
      statements: {
        Statement: [
          {
            Action: ['finance:ReadBalanceSheet'],
            Effect: 'Allow',
            Resource: ['database:pg01:balancesheet']
          },
          {
            Action: ['finance:ImportBalanceSheet'],
            Effect: 'Deny',
            Resource: ['database:pg01:balancesheet']
          },
          {
            Action: ['finance:ReadCompanies'],
            Effect: 'Allow',
            Resource: ['database:pg01:companies']
          },
          {
            Action: ['finance:UpdateCompanies'],
            Effect: 'Deny',
            Resource: ['database:pg01:companies']
          },
          {
            Action: ['finance:DeleteCompanies'],
            Effect: 'Deny',
            Resource: ['database:pg01:companies']
          }
        ]
      }
    },
    {
      id: 'policyId13',
      version: '0.1',
      name: 'Edit teams',
      statements: {
        Statement: [
          { Action: ['Edit'], Effect: 'Allow', Resource: ['/myapp/teams/*'] }
        ]
      }
    }
  ]
}

it('should render with default props', () => {
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

  const component = renderer.create(<TeamsPoliciesMapper />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()

  global.fetch.mockRestore()
})

it('should warn user if no onCancel function is passed into component', () => {
  const component = renderer.create(<TeamsPoliciesMapper />)
  const instance = component.root.instance
  const spy = jest.spyOn(global.console, 'log')

  expect(typeof instance.props.onCancel).toBe('function')
  instance.props.onCancel()

  expect(spy).toHaveBeenCalled()

  expect(global.console.log.mock.calls[0][0]).toBe(
    'WARNING: No onCancel function passed into the <TeamPoliciesMapper /> component.'
  )

  spy.mockReset()
  spy.mockRestore()
})

it('should handle component unmount with running promises', done => {
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
  const component = renderer.create(<TeamsPoliciesMapper />)
  const instance = component.root.instance
  instance._timers.push(setTimeout(jest.fn(), 3000))
  expect(instance.state.loading).toBeTruthy()

  process.nextTick(async () => {
    await component.unmount()
    const { _runningPromises } = instance
    expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()
    expect(instance.setStateAsync()).toBe(false)

    global.fetch.mockRestore()
    done()
  })
})

it('should handle component unmount with running promises', async () => {
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
  const component = renderer.create(<TeamsPoliciesMapper />)
  const instance = component.root.instance
  instance._timers.push(setTimeout(jest.fn(), 3000))
  expect(instance.state.loading).toBeTruthy()

  await component.unmount()
  const { _runningPromises } = instance
  expect(_runningPromises.every(p => p.hasCanceled())).toBeTruthy()

  global.fetch.mockRestore()
})

it('should set state of success to false on dismiss', done => {
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

  const component = renderer.create(<TeamsPoliciesMapper />)
  const instance = component.root.instance
  instance.setState({
    success: true
  })
  expect(instance.state.success).toBeTruthy()

  instance.onDismiss()
  expect(instance.state.success).toBeFalsy()

  global.fetch.mockRestore()
  done()
})

it('should sort names', () => {
  const data = [{ name: 'b' }, { name: 'c' }, { name: 'c' }, { name: 'a' }]
  expect(data.sort(sort)).toEqual([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    { name: 'c' }
  ])
})

it('should map policies', () => {
  const data = [{ id: '1' }, { id: '2' }]
  const Policies = () => data.map(mapPolicies)
  const component = renderer.create(<Policies />)
  const json = component.toJSON()

  expect(json).toMatchSnapshot()
})

it('should load policies', done => {
  global.fetch = jest.fn().mockImplementation((...args) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: function() {
          if (args[0].includes('teams')) {
            return teamPolicies
          }
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance

  process.nextTick(() => {
    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch.mock.calls[0][0]).toEqual(
      'my-udaru-url/authorization/policies'
    )
    expect(global.fetch.mock.calls[0][1]).toEqual({
      headers: {
        authorization: 'my-authorization',
        org: 'my-org'
      }
    })
    expect(global.fetch.mock.calls[1][0]).toEqual(
      'my-udaru-url/authorization/teams/123'
    )
    expect(global.fetch.mock.calls[1][1]).toEqual({
      headers: {
        authorization: 'my-authorization',
        org: 'my-org'
      }
    })

    expect(instance.state.teamPolicies).toEqual(teamPolicies.policies)
    expect(instance.state.allPolicies.map(p => p.id)).toEqual([
      'policyId2',
      'policyId13'
    ])
    done()
  })
})

it('should move policies right and left', done => {
  global.fetch = jest.fn().mockImplementation((...args) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: function() {
          if (args[0].includes('teams')) {
            return teamPolicies
          }
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.teamPolicies).toEqual(teamPolicies.policies)
    expect(instance.state.allPolicies.map(p => p.id)).toEqual([
      'policyId2',
      'policyId13'
    ])

    instance.setSelectedAllPolicies({
      target: {
        selectedOptions: [
          {
            value: 'policyId2'
          }
        ]
      }
    })

    instance.onMoveRight()

    expect(
      instance.state.teamPolicies.find(p => p.id === 'policyId2')
    ).toBeDefined()

    expect(
      instance.state.allPolicies.find(p => p.id === 'policyId2')
    ).not.toBeDefined()

    instance.setSelectedTeamPolicies({
      target: {
        selectedOptions: [
          {
            value: 'policyId2'
          }
        ]
      }
    })

    instance.onMoveLeft()

    expect(
      instance.state.teamPolicies.find(p => p.id === 'policyId2')
    ).not.toBeDefined()

    expect(
      instance.state.allPolicies.find(p => p.id === 'policyId2')
    ).toBeDefined()

    done()
  })
})

it('should handle error if teams fails to load', done => {
  global.fetch = jest.fn().mockImplementation((...args) => {
    if (args[0].includes('teams')) {
      return new Promise((resolve, reject) => {
        resolve({
          ok: false,
          json: function() {
            return allPolicies
          }
        })
      })
    }

    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: function() {
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance

  process.nextTick(() => {
    expect(instance.state.success).toBe(false)
    expect(instance.state.error).toBeDefined()
    expect(instance.state.error.message).toBe(
      'there was an error fetching team policies.'
    )

    done()
  })
})

it('should handle error if all policies fails to load', done => {
  global.fetch = jest.fn().mockImplementation((...args) => {
    if (args[0].includes('teams')) {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return allPolicies
          }
        })
      })
    }

    return new Promise((resolve, reject) => {
      resolve({
        ok: false,
        json: function() {
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance

  process.nextTick(() => {
    const { success, loading, error } = instance.state

    expect(success).toBeFalsy()
    expect(loading).toBeFalsy()
    expect(error).toBeDefined()
    expect(error.message).toBe('there was an error fetching all policies.')

    done()
  })
})

it('should save team policies successfully', async () => {
  jest.useFakeTimers()

  global.fetch = jest.fn().mockImplementation((...args) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: function() {
          if (args[0].includes('teams')) {
            return teamPolicies
          }
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance
  const preventDefault = jest.fn()
  const e = { preventDefault }
  await instance.onSubmit(e)

  expect(preventDefault).toHaveBeenCalled()
  expect(instance.state.success).toBeTruthy()
  jest.advanceTimersByTime(3001)
  expect(instance.state.success).toBeFalsy()
})

it('should handle error saving team policies', async () => {
  jest.useFakeTimers()

  global.fetch = jest.fn().mockImplementation((...args) => {
    if (args[1].method === 'POST') {
      return new Promise((resolve, reject) => {
        resolve({
          ok: false
        })
      })
    }
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: function() {
          if (args[0].includes('teams')) {
            return teamPolicies
          }
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance
  const preventDefault = jest.fn()
  const e = { preventDefault }
  await instance.onSubmit(e)

  expect(preventDefault).toHaveBeenCalled()
  expect(instance.state.success).toBeFalsy()
  expect(instance.state.error.message).toBe('there was an error saving team.')
})

it('should cancel promise when unmounting component while saving', done => {
  jest.useFakeTimers()

  global.fetch = jest.fn().mockImplementation((...args) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: function() {
          if (args[0].includes('teams')) {
            return teamPolicies
          }
          return allPolicies
        }
      })
    })
  })

  const component = renderer.create(
    <TeamsPoliciesMapper
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      id="123"
    />
  )
  const instance = component.root.instance
  const preventDefault = jest.fn()
  const e = { preventDefault }

  process.nextTick(() => {
    instance.onSubmit(e)
    const { _runningPromises } = instance
    _runningPromises[2].cancel()

    expect(_runningPromises[2].hasCanceled()).toBeTruthy()

    done()
  })
})
