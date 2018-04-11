import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Button,
  Box,
  Heading,
  Input,
  InputGroup,
  Label,
  Text,
  PageHeader
} from './components'

class CreateTeamForm extends React.Component {
  state = {
    formIncomplete: null,
    formValues: {
      id: this.props.id || '',
      name: this.props.name || '',
      description: this.props.description || '',
      userId: this.props.userId || '',
      userName: this.props.userName || ''
    },
    validationState: {
      id: null,
      name: null,
      description: null,
      userId: null,
      userName: null
    }
  }

  static propTypes = {
    headerText: PropTypes.string,
    onFormSubmit: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    headerText: 'Create Team',
    onFormSubmit: () => {
      console.log(
        'WARNING: No onFormSubmit function passed into the <CreateTeamForm /> component.'
      )
    }
  }

  isValidForm = this.isValidForm.bind(this)
  isValidForm() {
    return Object.values(this.state.formValues).every(v => Boolean(v))
  }

  validateForm = this.validateForm.bind(this)
  validateForm() {
    this.setState({
      formIncomplete: true,
      validationState: Object.keys(this.state.formValues)
        .map(key => ({ key, value: this.state.formValues[key] }))
        .reduce((accum, { key, value }) => {
          accum[key] = value.length > 0 ? 'success' : 'error'
          return accum
        }, {})
    })
  }

  onSubmit = this.onSubmit.bind(this)
  onSubmit(e) {
    e.preventDefault()

    return this.isValidForm()
      ? this.props.onFormSubmit(this.state.formValues)
      : this.validateForm()
  }

  handleChange = this.handleChange.bind(this)
  handleChange(e) {
    const inputName = e.target.id
    const value = e.target.value
    this.setState({
      formValues: {
        ...this.state.formValues,
        [inputName]: value
      }
    })
  }

  handleBlur = this.handleBlur.bind(this)
  handleBlur(e) {
    const inputName = e.target.id
    const value = e.target.value
    this.setState({
      validationState: {
        ...this.state.validationState,
        [inputName]: value.length > 0 ? 'success' : 'error'
      }
    })
  }

  render() {
    return (
      <Box m={4}>
        <PageHeader>{this.props.headerText}</PageHeader>
        {this.state.formIncomplete && (
          <Alert variant="danger" onDismiss={this.onDismiss}>
            All fields in <Text.span bold>RED</Text.span> are required.
          </Alert>
        )}
        <form onSubmit={this.onSubmit}>
          <Heading.h3>Team Details</Heading.h3>
          <InputGroup validationState={this.state.validationState.id}>
            <Label>ID</Label>
            <Input
              id="id"
              type="text"
              placeholder="ID"
              value={this.state.formValues.id}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </InputGroup>
          <InputGroup validationState={this.state.validationState.name}>
            <Label>Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={this.state.formValues.name}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </InputGroup>
          <InputGroup validationState={this.state.validationState.description}>
            <Label>Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Description"
              value={this.state.formValues.description}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </InputGroup>
          <Heading.h3>Default Admin User</Heading.h3>
          <InputGroup validationState={this.state.validationState.userId}>
            <Label>User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="User ID"
              value={this.state.formValues.userId}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </InputGroup>
          <InputGroup validationState={this.state.validationState.userName}>
            <Label>User Name</Label>
            <Input
              id="userName"
              type="text"
              placeholder="User Name"
              value={this.state.formValues.userName}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </InputGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="link" onClick={this.props.onCancel}>
            Cancel
          </Button>
        </form>
      </Box>
    )
  }
}

export default CreateTeamForm
