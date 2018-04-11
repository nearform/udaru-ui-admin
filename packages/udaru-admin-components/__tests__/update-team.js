import React from 'react'
import renderer from 'react-test-renderer'
import UpdateTeam from 'update-team'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import theme from '../lib/components/theme'

expect.addSnapshotSerializer(createSerializer(emotion))

it('should render with default props', () => {
  const component = renderer.create(
    <UpdateTeam theme={theme} team={{ id: '1' }} />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should warn user if no onCancel function is passed into component', () => {
  const component = renderer.create(<UpdateTeam theme={theme} />)
  const instance = component.root.instance
  const spy = jest.spyOn(global.console, 'log')

  expect(typeof instance.props.onCancel).toBe('function')
  instance.props.onCancel()

  expect(spy).toHaveBeenCalled()

  expect(global.console.log.mock.calls[0][0]).toBe(
    'WARNING: No onCancel function passed into the <UpdateTeam /> component.'
  )

  spy.mockReset()
  spy.mockRestore()
})

it('should reset state on dismissable error', () => {
  const component = renderer.create(
    <UpdateTeam theme={theme} team={{ id: '1' }} />
  )
  const instance = component.root.instance

  instance.setState({ success: true, hasError: true, errorMessage: 'foo' })
  expect(instance.state.success).toBeTruthy()

  instance.onDismiss()

  const { success, hasError, errorMessage } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeFalsy()
  expect(errorMessage).toBe('')
})

it('empty render if no team passed', () => {
  const component = renderer.create(<UpdateTeam theme={theme} />)
  const json = component.toJSON()

  expect(json).toMatchSnapshot()
})

it('should throw error in render and catch in error boundary', () => {
  const error = new Error('oops')
  const info = 'some info'
  const logError = jest.fn()
  const component = renderer.create(
    <UpdateTeam theme={theme} logError={logError} />
  )
  const instance = component.root.instance

  instance.componentDidCatch(error, info)

  expect(instance.state.hasError).toBeTruthy()
  expect(instance.state.errorMessage).toBe('An error has occured.')
  expect(logError).toHaveBeenCalled()
  expect(logError).toHaveBeenCalledWith(error, info)
})

it('should successfully submit form', async () => {
  const teamData = {
    id: '1',
    name: 'Team 1',
    description: 'Team description'
  }
  const teamToUpdate = {
    id: '1',
    name: 'Team 1 Updated',
    description: 'Team Description Update'
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
    <UpdateTeam
      theme={theme}
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      team={teamData}
    />
  )
  const instance = component.root.instance
  expect(instance.state.success).toBeFalsy()

  await instance.onFormSubmit(teamToUpdate)

  const {
    success,
    nonDismissableError,
    hasError,
    errorMessage
  } = instance.state
  expect(success).toBeTruthy()
  expect(hasError).toBeFalsy()
  expect(nonDismissableError).toBeFalsy()
  expect(errorMessage).toBe('')

  global.fetch.mockRestore()
})

it('should error if no url set', async () => {
  const component = renderer.create(
    <UpdateTeam
      theme={theme}
      authorization="my-authorization"
      org="my-org"
      team={{ id: '1' }}
    />
  )
  const instance = component.root.instance

  expect(instance.state.success).toBeFalsy()

  await instance.onFormSubmit({ name: '', description: '' })

  const {
    success,
    nonDismissableError,
    hasError,
    errorMessage
  } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeTruthy()
  expect(nonDismissableError).toBeFalsy()
  expect(errorMessage).toBe('Udaru URL prop not passed into component.')
})

it('should error if no authorization set', async () => {
  const component = renderer.create(
    <UpdateTeam
      theme={theme}
      udaruUrl="my-udaru-url"
      org="my-org"
      team={{ id: '1' }}
    />
  )
  const instance = component.root.instance

  expect(instance.state.success).toBeFalsy()

  await instance.onFormSubmit({ name: '', description: '' })

  const {
    success,
    nonDismissableError,
    hasError,
    errorMessage
  } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeTruthy()
  expect(nonDismissableError).toBeFalsy()
  expect(errorMessage).toBe('Authorization prop not passed into component.')
})

it('should handle error when updating team', async () => {
  const teamData = {
    id: '1',
    name: 'Team 1',
    description: 'Team description'
  }
  const teamToUpdate = {
    id: '1',
    name: 'Team 1 Updated',
    description: 'Team Description Update'
  }
  global.fetch = jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve({
          ok: false,
          json: function() {
            return teamData
          }
        })
      })
  )

  const component = renderer.create(
    <UpdateTeam
      theme={theme}
      udaruUrl="my-udaru-url"
      authorization="my-authorization"
      org="my-org"
      team={teamData}
    />
  )
  const instance = component.root.instance
  expect(instance.state.success).toBeFalsy()

  await instance.onFormSubmit(teamToUpdate)

  const {
    success,
    nonDismissableError,
    hasError,
    errorMessage
  } = instance.state

  expect(success).toBeFalsy()
  expect(hasError).toBeTruthy()
  expect(nonDismissableError).toBeFalsy()
  expect(errorMessage).toBe('error saving that team.')

  global.fetch.mockRestore()
})
