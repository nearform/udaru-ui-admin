import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Box,
  Button,
  Input,
  InputGroup,
  Label,
  Text,
  PageHeader
} from './components'

class UpdateTeamForm extends React.Component {
  state = {
    formIncomplete: null,
    formValues: {
      name: this.props.name || '',
      description: this.props.description || ''
    },
    validationState: {
      name: null,
      description: null
    }
  }

  static propTypes = {
    headerText: PropTypes.string,
    onFormSubmit: PropTypes.func
  }

  static defaultProps = {
    headerText: 'Update Team',
    onFormSubmit: () => {
      console.log(
        'WARNING: No onFormSubmit function passed into the <UpdateTeamForm /> component.'
      )
    }
  }

  componentDidMount() {
    return this.validateForm()
  }

  isValidForm = this.isValidForm.bind(this)
  isValidForm() {
    return Object.values(this.state.formValues).every(v => Boolean(v))
  }

  validateForm = this.validateForm.bind(this)
  validateForm() {
    this.setState({
      formIncomplete: !this.isValidForm(),
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
    this.validateForm()
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
          <InputGroup>
            <Label>ID</Label>
            <Input
              type="text"
              placeholder="ID"
              disabled
              value={this.props.id}
            />
          </InputGroup>
          <InputGroup
            controlId="name"
            validationState={this.state.validationState.name}
          >
            <Label>Name</Label>
            <Input
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
              type="text"
              placeholder="Description"
              value={this.state.formValues.description}
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

export default UpdateTeamForm
