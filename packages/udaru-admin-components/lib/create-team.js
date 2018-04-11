import React from 'react'
import PropTypes from 'prop-types'
import CreateTeamForm from './create-team-form'
import { Alert, Box, Text } from './components'

class CreateTeam extends React.Component {
  state = {
    success: false,
    hasError: false,
    errorMessage: ''
  }

  static propTypes = {
    udaruUrl: PropTypes.string,
    authorization: PropTypes.string,
    org: PropTypes.string,
    headerText: PropTypes.string,
    logError: PropTypes.func
  }

  static defaultProps = {
    udaruUrl: '',
    authorization: '',
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
    this.props.logError && this.props.logError(error, info)
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
      <Box m={4}>
        <Alert variant="success" onDismiss={this.props.onCancel}>
          <Text.span bold>Team Successfully Created!</Text.span>
        </Alert>
      </Box>
    ) : (
      <Box m={4}>
        {this.state.hasError && (
          <Alert variant="danger" onDismiss={this.onDismiss}>
            <Text.span bold>Oops! There was an error</Text.span>
            {this.state.errorMessage && (
              <Text.p>{this.state.errorMessage}</Text.p>
            )}
          </Alert>
        )}
        <CreateTeamForm
          headerText={this.props.headerText}
          onFormSubmit={this.onFormSubmit}
          onCancel={this.props.onCancel}
        />
      </Box>
    )
  }
}

export default CreateTeam
