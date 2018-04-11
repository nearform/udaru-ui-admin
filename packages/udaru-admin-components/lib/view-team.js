import React from 'react'
import { makeCancellable } from './makeCancellable'
import { Button, Box, Icon, Heading } from './components'
import Team from './team'
import TeamUsers from './team-users'

class ViewTeam extends React.Component {
  state = {
    loading: true,
    error: null,
    team: null
  }

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve))
  }

  _runningPromises = []

  async fetchTeam(id) {
    const cancelablePromise = makeCancellable(this._fetchTeam(id))
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise

      await this.setStateAsync({
        loading: false,
        error: null,
        team: response
      })
    } catch (reason) {
      if (!reason.isCanceled) {
        await this.setStateAsync({
          loading: false,
          error: reason
        })
      }
    }
  }

  async _fetchTeam(id) {
    const response = await fetch(
      `${this.props.udaruUrl}/authorization/teams/${id}`,
      {
        headers: {
          authorization: this.props.authorization,
          org: this.props.org
        }
      }
    )

    if (!response.ok)
      throw new Error('there was an error loading team details.')

    const json = await response.json()

    return json
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      return this.fetchTeam(nextProps.id)
    }
  }

  componentDidMount() {
    return this.fetchTeam(this.props.id)
  }

  componentWillUnmount() {
    this._runningPromises.forEach(promise => promise.cancel())
  }

  render() {
    return this.state.loading ? (
      <Heading.h3>Loading</Heading.h3>
    ) : this.state.error ? (
      <Heading.h3>error</Heading.h3>
    ) : (
      <React.Fragment>
        {this.props.onViewParent &&
          Boolean(this.props.parentTeamId) && (
            <Button
              style={{ margin: '20px 0' }}
              onClick={() => this.props.onViewParent(this.props.parentTeamId)}
            >
              <Icon name="arrowUp" size={16} /> View Parent
            </Button>
          )}

        <Team {...this.state.team} />

        <TeamUsers
          id={this.props.id}
          udaruUrl={this.props.udaruUrl}
          authorization={this.props.authorization}
          org={this.props.org}
        />
        <Button variant="link" onClick={this.props.onCancel}>
          Go Back
        </Button>
      </React.Fragment>
    )
  }
}

export default ViewTeam
