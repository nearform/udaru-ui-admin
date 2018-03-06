import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Box, Button, Heading, Text, PageHeader } from './components'

class DeleteTeam extends React.Component {
  state = {
    nonDismissableError: !Boolean(this.props.id),
    hasError: !Boolean(this.props.id),
    errorMessage: !Boolean(this.props.id)
      ? 'No Team ID passed into component.'
      : !Boolean(this.props.name) ? 'No Team name passed into component.' : ''
  }

  static propTypes = {
    udaruUrl: PropTypes.string,
    authorization: PropTypes.string,
    org: PropTypes.string,
    headerText: PropTypes.string,
    logError: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string
  }

  static defaultProps = {
    udaruUrl: '',
    authorization: '',
    id: '',
    name: '',
    headerText: 'Delete Team',
    onCancel: () => {
      console.log(
        'WARNING: No onCancel function passed into the <DeleteTeam /> component.'
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

  async delete(url, headers, body) {
    if (!Boolean(url))
      throw new Error('Udaru URL prop not passed into component.')
    if (!Boolean(headers.authorization))
      throw new Error('Authorization prop not passed into component.')

    const response = await fetch(
      `${url}/authorization/teams/${this.props.id}`,
      {
        method: 'DELETE',
        headers
      }
    )

    if (!response.ok) {
      throw new Error('There was an error deleting that team.')
    }
  }

  onTeamDelete = this.onTeamDelete.bind(this)
  async onTeamDelete({ name, description }) {
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
      await this.delete(udaruUrl, headers, body)
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
          <Text.span bold>Team Successfully Removed!</Text.span>
        </Alert>
      </Box>
    ) : (
      <Box m={4}>
        <PageHeader>{this.props.headerText}</PageHeader>
        <Heading.h3>
          Are you sure you want to delete {this.props.name}?
        </Heading.h3>
        <Text.p>
          This action <Text.span bold>CANNOT</Text.span> be undone.
        </Text.p>
        <Button variant="danger" onClick={this.onTeamDelete}>
          DELETE
        </Button>
        <Button variant="link" onClick={this.props.onCancel}>
          CANCEL
        </Button>
      </Box>
    )
  }
}

export default DeleteTeam
