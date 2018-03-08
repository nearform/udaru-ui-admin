import React from 'react'
import renderer from 'react-test-renderer'
import CreateTeam from 'create-team'

it('should render with default props', () => {
  const component = renderer.create(<CreateTeam />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should warn user if no onCancel prop passed into component', () => {
  const component = renderer.create(<CreateTeam udaruUrl="" authorization="" />)
  const instance = component.root.instance
  const spy = jest.spyOn(global.console, 'log')

  expect(typeof instance.props.onCancel).toBe('function')

  instance.props.onCancel()

  expect(spy).toHaveBeenCalled()
  expect(global.console.log.mock.calls[0][0]).toBe(
    'WARNING: No onCancel function passed into the <CreateTeam /> component.'
  )

  spy.mockReset()
  spy.mockRestore()
})

it('should catch error in render', () => {
  const logError = jest.fn()
  const error = new Error('oops')
  const info = 'some info about error'
  const component = renderer.create(
    <CreateTeam udaruUrl="" authorization="" logError={logError} />
  )
  const instance = component.root.instance

  instance.componentDidCatch(error, info)

  expect(instance.state.hasError).toBeTruthy()
  expect(instance.state.errorMessage).toBe('An error has occured.')
  expect(logError).toHaveBeenCalled()
  expect(logError).toHaveBeenCalledWith(error, info)
})

it('should handle dismissing alert message', async () => {
  const component = renderer.create(<CreateTeam />)

  const instance = component.root.instance

  instance.onDismiss()

  const { success, hasError, errorMessage } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeFalsy()
  expect(errorMessage).toBe('')
})

it('should error with no url is set', () => {
  const formValues = {
    id: 'value',
    name: 'value',
    description: 'value',
    userId: 'value',
    userName: 'value'
  }
  const component = renderer.create(
    <CreateTeam authorization="my-authorization-id" />
  )
  const instance = component.root.instance

  instance.onFormSubmit(formValues)
})

it('should error with no authorization is set', () => {
  const formValues = {
    id: 'value',
    name: 'value',
    description: 'value',
    userId: 'value',
    userName: 'value'
  }
  const component = renderer.create(<CreateTeam udaruUrl="my-url" />)
  const instance = component.root.instance

  instance.onFormSubmit(formValues)
})

it('should submit form successfully', async () => {
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

  const formValues = {
    id: 'value',
    name: 'value',
    description: 'value',
    userId: 'value',
    userName: 'value'
  }
  const component = renderer.create(
    <CreateTeam
      udaruUrl="http://my-udaru-url"
      authorization="my-authorization-id"
      org="my-special-org"
    />
  )
  const instance = component.root.instance
  await instance.onFormSubmit(formValues)

  const { success, hasError, errorMessage } = instance.state
  const [url, options] = global.fetch.mock.calls[0]

  const { method, headers, body } = options

  expect(url).toBe('http://my-udaru-url/authorization/teams')
  expect(method).toBe('POST')
  expect(headers).toEqual({
    authorization: 'my-authorization-id',
    org: 'my-special-org'
  })
  expect(body).toEqual(
    JSON.stringify({
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      user: {
        id: formValues.userId,
        name: formValues.userName
      }
    })
  )
  expect(success).toBeTruthy()
  expect(hasError).toBeFalsy()
  expect(errorMessage).toBe('')

  global.fetch.mockRestore()
})

it('should handle error submitting form', async () => {
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

  const formValues = {
    id: 'value',
    name: 'value',
    description: 'value',
    userId: 'value',
    userName: 'value'
  }
  const component = renderer.create(
    <CreateTeam
      udaruUrl="http://my-udaru-url"
      authorization="my-authorization-id"
      org="my-special-org"
    />
  )
  const instance = component.root.instance

  await instance.onFormSubmit(formValues)
  const { success, hasError, errorMessage } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeTruthy()
  expect(errorMessage).toBe('error saving that team.')

  global.fetch.mockRestore()
})
