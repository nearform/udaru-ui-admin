import React from 'react'
import PropTypes from 'prop-types'
import CreateTeamForm from './create-team-form'
import { Grid, Row, Col, Alert } from 'react-bootstrap'

class CreateTeam extends React.Component {
  state = {
    success: false,
    hasError: false,
    errorMessage: ''
  }

  static propTypes = {
    udaruUrl: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    org: PropTypes.string,
    headerText: PropTypes.string,
    logError: PropTypes.func
  }

  static defaultProps = {
    headerText: 'Create Team',
    onCancel: () => {
      console.log(
        'WARNING: No onCancel function passed into the <CreateTeam /> component.'
      )
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMessage: 'An error has occured.'
    })
    this.props.logError && this.props.logError()
  }

  async save(url, headers, body) {
    if (!Boolean(url))
      throw new Error('Udaru URL prop not passed into component.')
    if (!Boolean(headers.authorization))
      throw new Error('Authorization prop not passed into component.')

    const response = await fetch(`${url}/authorization/teams`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error('error saving that team.')
    }

    const json = await response.json()

    return json
  }

  onFormSubmit = this.onFormSubmit.bind(this)
  async onFormSubmit(formValues) {
    const { udaruUrl, authorization, org } = this.props

    const headers = {
      ...(authorization && { authorization }),
      ...(org && { org })
    }

    const body = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      user: {
        id: formValues.userId,
        name: formValues.userName
      }
    }

    try {
      await this.save(udaruUrl, headers, body)
      this.setState({
        success: true
      })
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: error.message
      })
    }
  }

  onDismiss = this.onDismiss.bind(this)
  onDismiss() {
    this.setState({
      success: false,
      hasError: false,
      errorMessage: ''
    })
  }

  render() {
    return this.state.success ? (
      <Grid>
        <Row>
          <Col xs={12}>
            <Alert bsStyle="success" onDismiss={this.props.onCancel}>
              <strong>Team Successfully Created!</strong>
            </Alert>
          </Col>
        </Row>
      </Grid>
    ) : (
      <Grid>
        <Row>
          <Col xs={12}>
            {this.state.hasError && (
              <Alert bsStyle="danger" onDismiss={this.onDismiss}>
                <strong>Oops! There was an error</strong>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
              </Alert>
            )}
            <CreateTeamForm
              headerText={this.props.headerText}
              onFormSubmit={this.onFormSubmit}
              onCancel={this.props.onCancel}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CreateTeam
