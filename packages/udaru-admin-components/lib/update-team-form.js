import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from 'react-bootstrap'

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
    this.validateForm()
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
      <Grid>
        <Row>
          <Col xs={12}>
            <PageHeader>{this.props.headerText}</PageHeader>
          </Col>
          <Col xs={12}>
            {this.state.formIncomplete && (
              <Alert bsStyle="danger" onDismiss={this.onDismiss}>
                All fields in <strong>RED</strong> are required.
              </Alert>
            )}
          </Col>
          <Col xs={12}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <ControlLabel>ID</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="ID"
                  disabled
                  value={this.props.id}
                />
              </FormGroup>
              <FormGroup
                controlId="name"
                validationState={this.state.validationState.name}
              >
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Name"
                  value={this.state.formValues.name}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="description"
                validationState={this.state.validationState.description}
              >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Description"
                  value={this.state.formValues.description}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <FormControl.Feedback />
              </FormGroup>

              <Button bsStyle="primary" type="submit">
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.props.onCancel}>
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UpdateTeamForm
