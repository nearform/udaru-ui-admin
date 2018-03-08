import React from 'react'
import renderer from 'react-test-renderer'
import DeleteTeam from 'delete-team'

it('should render with minimum props', () => {
  const component = renderer.create(
    <DeleteTeam
      udaruUrl="udaru-url"
      authorization="auth"
      id="1"
      name="team name"
    />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should warn user if no onCancel prop passed into component', () => {
  const component = renderer.create(
    <DeleteTeam
      udaruUrl="udaru-url"
      authorization="auth"
      id="1"
      name="team name"
    />
  )
  const instance = component.root.instance
  const spy = jest.spyOn(global.console, 'log')

  expect(typeof instance.props.onCancel).toBe('function')

  instance.props.onCancel()

  expect(spy).toHaveBeenCalled()
  expect(global.console.log.mock.calls[0][0]).toBe(
    'WARNING: No onCancel function passed into the <DeleteTeam /> component.'
  )

  spy.mockReset()
  spy.mockRestore()
})

it('should catch error in render', () => {
  const logError = jest.fn()
  const error = new Error('oops')
  const info = 'some info about error'
  const component = renderer.create(
    <DeleteTeam
      udaruUrl="udaru-url"
      authorization="auth"
      id="1"
      name="team name"
      logError={logError}
    />
  )
  const instance = component.root.instance

  instance.componentDidCatch(error, info)

  expect(instance.state.hasError).toBeTruthy()
  expect(instance.state.errorMessage).toBe('An error has occured.')
  expect(logError).toHaveBeenCalled()
  expect(logError).toHaveBeenCalledWith(error, info)
})

it('should handle dismissing alert message', async () => {
  const component = renderer.create(
    <DeleteTeam
      udaruUrl="udaru-url"
      authorization="auth"
      id="1"
      name="team name"
    />
  )

  const instance = component.root.instance

  instance.onDismiss()

  const { success, hasError, errorMessage } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeFalsy()
  expect(errorMessage).toBe('')
})

it('should set error message when no id passed in as a prop', () => {
  const component = renderer.create(
    <DeleteTeam udaruUrl="udaru-url" authorization="auth" name="team name" />
  )
  const instance = component.root.instance

  expect(instance.state.errorMessage).toBe('No Team ID passed into component.')
})

it('should set error message when no name passed in as a prop', () => {
  const component = renderer.create(
    <DeleteTeam udaruUrl="udaru-url" authorization="auth" id="team id" />
  )
  const instance = component.root.instance

  expect(instance.state.errorMessage).toBe(
    'No Team name passed into component.'
  )
})

it('should error with no url is set', () => {
  const formValues = {
    name: 'value',
    description: 'value'
  }
  const component = renderer.create(
    <DeleteTeam authorization="my-authorization-id" org="my-org" />
  )
  const instance = component.root.instance

  instance.onTeamDelete(formValues)
})

it('should error with no authorization is set', () => {
  const formValues = {
    name: 'value',
    description: 'value'
  }
  const component = renderer.create(
    <DeleteTeam udaruUrl="my-url" org="my-org" />
  )
  const instance = component.root.instance

  instance.onTeamDelete(formValues)
})

it('should delete a team successfully', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: true
        })
      })
  )

  const formValues = {
    name: 'value',
    description: 'value'
  }
  const component = renderer.create(
    <DeleteTeam
      udaruUrl="http://my-udaru-url"
      authorization="my-authorization-id"
      org="my-special-org"
      id="123"
      name="team 123"
    />
  )
  const instance = component.root.instance
  await instance.onTeamDelete(formValues)

  const { success, hasError, errorMessage } = instance.state
  const [url, options] = global.fetch.mock.calls[0]

  const { method, headers } = options

  expect(url).toBe('http://my-udaru-url/authorization/teams/123')
  expect(method).toBe('DELETE')
  expect(headers).toEqual({
    authorization: 'my-authorization-id',
    org: 'my-special-org'
  })
  expect(success).toBeTruthy()
  expect(hasError).toBeFalsy()
  expect(errorMessage).toBe('')

  global.fetch.mockRestore()
})

it('should handle a failed delete', async () => {
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: false
        })
      })
  )

  const formValues = {
    name: 'value',
    description: 'value'
  }
  const component = renderer.create(
    <DeleteTeam
      udaruUrl="http://my-udaru-url"
      authorization="my-authorization-id"
      org="my-special-org"
      id="123"
      name="team 123"
    />
  )
  const instance = component.root.instance
  await instance.onTeamDelete(formValues)

  const { success, hasError, errorMessage } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeTruthy()
  expect(errorMessage).toBe('There was an error deleting that team.')

  global.fetch.mockRestore()
})
