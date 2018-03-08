import React from 'react'
import renderer from 'react-test-renderer'
import CreateTeamForm from 'create-team-form'

it('should render with default props', () => {
  const component = renderer.create(<CreateTeamForm />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should warn user if no onFormSubmit function is passed into component', () => {
  const component = renderer.create(<CreateTeamForm />)
  const instance = component.root.instance
  const spy = jest.spyOn(global.console, 'log')

  expect(typeof instance.props.onFormSubmit).toBe('function')
  instance.props.onFormSubmit()

  expect(spy).toHaveBeenCalled()

  expect(global.console.log.mock.calls[0][0]).toBe(
    'WARNING: No onFormSubmit function passed into the <CreateTeamForm /> component.'
  )

  spy.mockReset()
  spy.mockRestore()
})

it('should submit handle invalid form', () => {
  const component = renderer.create(<CreateTeamForm />)
  const instance = component.root.instance
  const e = {
    preventDefault: () => ({})
  }
  instance.onSubmit(e)

  const { validationState } = instance.state

  expect(Object.values(validationState).every(s => s === 'error')).toBeTruthy()
})

it('should update form values on change and blur', () => {
  const testId = 'test value 1'
  const component = renderer.create(<CreateTeamForm />)
  const instance = component.root.instance
  const e = {
    target: {
      id: 'id',
      value: testId
    }
  }

  instance.handleChange(e)
  instance.handleBlur(e)

  const { formValues, validationState } = instance.state

  expect(formValues.id).toBe(testId)
  expect(validationState.id).toBe('success')
})

it('should update form values on change and blur with invalid field', () => {
  const testId = ''
  const component = renderer.create(<CreateTeamForm />)
  const instance = component.root.instance
  const e = {
    target: {
      id: 'id',
      value: testId
    }
  }

  instance.handleChange(e)
  instance.handleBlur(e)

  const { formValues, validationState } = instance.state

  expect(formValues.id).toBe(testId)
  expect(validationState.id).toBe('error')
})

it('should set success on valid form', () => {
  const value = 'random value'
  const component = renderer.create(<CreateTeamForm />)
  const instance = component.root.instance
  const valueFormData = [
    { id: 'id', value },
    { id: 'name', value },
    { id: 'description', value },
    { id: 'userId', value },
    { id: 'userName', value }
  ]

  valueFormData.forEach(data => {
    const e = {
      target: data
    }

    instance.handleChange(e)
    instance.handleBlur(e)
  })

  const { formValues, validationState } = instance.state

  expect(Object.values(formValues).every(d => d === value)).toBeTruthy()
  expect(
    Object.values(validationState).every(d => d === 'success')
  ).toBeTruthy()
  expect(instance.isValidForm()).toBeTruthy()
})

it('should set success on valid form when blur has not run', () => {
  const value = 'random value'
  const component = renderer.create(<CreateTeamForm />)
  const instance = component.root.instance
  const valueFormData = [
    { id: 'id', value },
    { id: 'name', value },
    { id: 'description', value },
    { id: 'userId', value },
    { id: 'userName', value }
  ]

  valueFormData.slice(-4).forEach(data => {
    const e = {
      target: data
    }

    instance.handleChange(e)
    instance.handleBlur(e)
  })

  instance.onSubmit({ preventDefault: jest.fn() })

  const { formIncomplete, formValues, validationState } = instance.state

  expect(formValues.id).toBe('')
  expect(validationState.id).toBe('error')
  expect(formIncomplete).toBeTruthy()
})

it('should set success on valid form when blur has not run', () => {
  const value = 'random value'
  const onFormSubmit = jest.fn()
  const valueFormData = [
    { id: 'id', value },
    { id: 'name', value },
    { id: 'description', value },
    { id: 'userId', value },
    { id: 'userName', value }
  ]
  const expectedResultObject = valueFormData.reduce((accum, data) => {
    accum[data.id] = value
    return accum
  }, {})

  const component = renderer.create(
    <CreateTeamForm onFormSubmit={onFormSubmit} />
  )
  const instance = component.root.instance

  valueFormData.forEach(data => {
    const e = {
      target: data
    }

    instance.handleChange(e)
    instance.handleBlur(e)
  })

  expect(instance.isValidForm).toBeTruthy()

  instance.onSubmit({ preventDefault: jest.fn() })

  expect(onFormSubmit.mock.calls[0][0]).toEqual(expectedResultObject)
})
