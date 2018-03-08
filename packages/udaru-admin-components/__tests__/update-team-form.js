import React from 'react'
import renderer from 'react-test-renderer'
import UpdateTeamForm from 'update-team-form'

it('should render with default props', () => {
  const component = renderer.create(<UpdateTeamForm />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should warn user if no onFormSubmit function is passed into component', () => {
  const component = renderer.create(<UpdateTeamForm />)
  const instance = component.root.instance
  const spy = jest.spyOn(global.console, 'log')

  expect(typeof instance.props.onFormSubmit).toBe('function')
  instance.props.onFormSubmit()

  expect(spy).toHaveBeenCalled()

  expect(global.console.log.mock.calls[0][0]).toBe(
    'WARNING: No onFormSubmit function passed into the <UpdateTeamForm /> component.'
  )

  spy.mockReset()
  spy.mockRestore()
})

it('should validate form with correct input', () => {
  const component = renderer.create(<UpdateTeamForm />)
  const instance = component.root.instance

  instance.handleChange({ target: { id: 'name', value: 'Team Name' } })
  instance.handleBlur({ target: { id: 'name', value: 'Team Name' } })
  const { formIncomplete, formValues, validationState } = instance.state

  expect(formIncomplete).toBeTruthy()
  expect(formValues.name).toBe('Team Name')
  expect(validationState.name).toBe('success')
})

it('should set validation error with invalid input', () => {
  const component = renderer.create(<UpdateTeamForm />)
  const instance = component.root.instance

  instance.handleChange({ target: { id: 'name', value: '' } })
  instance.handleBlur({ target: { id: 'name', value: '' } })
  const { formIncomplete, formValues, validationState } = instance.state

  expect(formIncomplete).toBeTruthy()
  expect(formValues.name).toBe('')
  expect(validationState.name).toBe('error')
})

it('should submit form', () => {
  const formValues = {
    id: '1',
    name: 'Team Name 1',
    description: 'Team Description 1'
  }
  const preventDefault = jest.fn()
  const e = { preventDefault }
  const onFormSubmit = jest.fn()

  const component = renderer.create(
    <UpdateTeamForm onFormSubmit={onFormSubmit} />
  )
  const instance = component.root.instance
  instance.onSubmit(e)
  expect(instance.state.formIncomplete).toBeTruthy()
  Object.keys(formValues).forEach(key => {
    instance.handleChange({ target: { id: key, value: formValues[key] } })
    instance.handleBlur({ target: { id: key, value: formValues[key] } })
  })
  expect(instance.state.formIncomplete).toBeFalsy()
  instance.onSubmit(e)
  expect(preventDefault).toHaveBeenCalled()
  expect(onFormSubmit).toHaveBeenCalled()
  expect(onFormSubmit).toHaveBeenCalledWith(formValues)
})
