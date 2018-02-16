import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, PageHeader, Alert, Button } from 'react-bootstrap'

class DeleteTeam extends React.Component {
  state = {
    nonDismissableError: !Boolean(this.props.id),
    hasError: !Boolean(this.props.id),
    errorMessage: !Boolean(this.props.id)
      ? 'No Team ID passed into component.'
      : ''
  }

  static propTypes = {
    udaruUrl: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    org: PropTypes.string,
    headerText: PropTypes.string,
    logError: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  static defaultProps = {
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
    this.props.logError && this.props.logError()
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
              <strong>Team Successfully Removed!</strong>
            </Alert>
          </Col>
        </Row>
      </Grid>
    ) : (
      <Grid>
        <Row>
          <Col xs={12}>
            <PageHeader>{this.props.headerText}</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h3>Are you sure you want to delete {this.props.name}?</h3>
          </Col>
          <Col xs={12}>
            <p>
              This action <strong>CANNOT</strong> be undone.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button bsStyle="danger" onClick={this.onTeamDelete}>
              DELETE
            </Button>
            <Button bsStyle="link" onClick={this.props.onCancel}>
              CANCEL
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DeleteTeam
