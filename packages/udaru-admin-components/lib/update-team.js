import React from 'react'
import PropTypes from 'prop-types'
import UpdateTeamForm from './update-team-form'
import { Grid, Row, Col, Alert } from 'react-bootstrap'

class UpdateTeam extends React.Component {
  state = {
    success: false,
    nonDismissableError:
      !Boolean(this.props.team) || !Boolean(this.props.team.id),
    hasError: !Boolean(this.props.team) || !Boolean(this.props.team.id),
    errorMessage:
      !Boolean(this.props.team) || !Boolean(this.props.team.id)
        ? 'No Team ID passed into component.'
        : ''
  }

  static propTypes = {
    udaruUrl: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    org: PropTypes.string,
    headerText: PropTypes.string,
    logError: PropTypes.func,
    team: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string
    }).isRequired
  }

  static defaultProps = {
    headerText: 'Update Team',
    onCancel: () => {
      console.log(
        'WARNING: No onCancel function passed into the <UpdateTeam /> component.'
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

  async update(url, headers, body) {
    if (!Boolean(url))
      throw new Error('Udaru URL prop not passed into component.')
    if (!Boolean(headers.authorization))
      throw new Error('Authorization prop not passed into component.')

    const response = await fetch(
      `${url}/authorization/teams/${this.props.team.id}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      }
    )

    if (!response.ok) {
      throw new Error('error saving that team.')
    }

    const json = await response.json()

    return json
  }

  onFormSubmit = this.onFormSubmit.bind(this)
  async onFormSubmit({ name, description }) {
    const { udaruUrl, authorization, org } = this.props

    const headers = {
      ...(authorization && { authorization }),
      ...(org && { org })
    }

    const body = {
      name,
      description
    }

    try {
      await this.update(udaruUrl, headers, body)
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
    !this.state.nonDismissableError &&
      this.setState({
        success: false,
        hasError: false,
        errorMessage: ''
      })
  }

  render() {
    return this.state.hasError ? (
      <Grid>
        <Row>
          <Col xs={12}>
            <Alert
              bsStyle="danger"
              {...!this.state.nonDismissableError && {
                onDismiss: this.onDismiss
              }}
            >
              <strong>Oops! There was an error</strong>
              {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
            </Alert>
          </Col>
        </Row>
      </Grid>
    ) : this.state.success ? (
      <Grid>
        <Row>
          <Col xs={12}>
            <Alert bsStyle="success" onDismiss={this.props.onCancel}>
              <strong>Team Successfully Updated!</strong>
            </Alert>
          </Col>
        </Row>
      </Grid>
    ) : (
      <UpdateTeamForm
        id={this.props.team.id}
        name={this.props.team.name}
        description={this.props.team.description}
        headerText={this.props.headerText}
        onFormSubmit={this.onFormSubmit}
        onCancel={this.props.onCancel}
      />
    )
  }
}

export default UpdateTeam
