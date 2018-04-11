import React from 'react'
import PropTypes from 'prop-types'
import UpdateTeamForm from './update-team-form'
import { Alert, Box, Text } from './components'

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
    udaruUrl: PropTypes.string,
    authorization: PropTypes.string,
    org: PropTypes.string,
    headerText: PropTypes.string,
    logError: PropTypes.func,
    team: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string
    })
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
    this.props.logError && this.props.logError(error, info)
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
      <Box m={4}>
        <Alert
          variant="danger"
          {...!this.state.nonDismissableError && {
            onDismiss: this.onDismiss
          }}
        >
          <Text.span bold>Oops! There was an error</Text.span>
          {this.state.errorMessage && (
            <Text.p>{this.state.errorMessage}</Text.p>
          )}
        </Alert>
      </Box>
    ) : this.state.success ? (
      <Box m={4}>
        <Alert variant="success" onDismiss={this.props.onCancel}>
          <Text.span bold>Team Successfully Updated!</Text.span>
        </Alert>
      </Box>
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
