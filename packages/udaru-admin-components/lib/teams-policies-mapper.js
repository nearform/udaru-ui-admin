import React from 'react'
import PropTypes from 'prop-types'
import { makeCancellable } from './makeCancellable'
import {
  Alert,
  Box,
  Button,
  Icon,
  Flex,
  Heading,
  InputGroup,
  PageHeader,
  Panel,
  Select,
  Text
} from './components'

export const sort = (a, b) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1
  }

  return 0
}

export const mapPolicies = policy => (
  <option key={policy.id} value={policy.id}>
    {policy.name}
  </option>
)

class TeamsPoliciesMapper extends React.Component {
  state = {
    loading: true,
    error: null,
    success: false,
    policies: [],
    allPolicies: [],
    teamPolicies: [],
    selectedAllPolicies: [],
    selectedTeamPolicies: []
  }

  static propTypes = {
    udaruUrl: PropTypes.string,
    authorization: PropTypes.string,
    org: PropTypes.string,
    onCancel: PropTypes.func,
    headerText: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string
  }

  static defaultProps = {
    headerText: 'Team Policies',
    onCancel: () => {
      console.log(
        'WARNING: No onCancel function passed into the <TeamsPoliciesMapper /> component.'
      )
    }
  }

  _unmounted = false
  _timers = []
  _runningPromises = []

  setStateAsync(state) {
    if (this._unmounted) return false

    return new Promise(resolve => this.setState(state, resolve))
  }

  async componentDidMount() {
    await this.fetchAllAvailablePolicies()
    await this.fetchTeamPolicies(this.props.id)

    return this.setStateAsync(state => {
      return {
        allPolicies: state.allPolicies.filter(
          policy =>
            !state.teamPolicies.find(teamPolicy => teamPolicy.id === policy.id)
        )
      }
    })
  }

  componentWillUnmount() {
    this._unmounted = true
    this._runningPromises.forEach(promise => promise.cancel())
    this._timers.forEach(t => clearTimeout(t))
  }

  async fetchAllAvailablePolicies() {
    const cancelablePromise = makeCancellable(this._fetchAllAvailablePolicies())
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise
      await this.setStateAsync({
        loading: false,
        allPolicies: response.data,
        policies: response.data
      })
    } catch (reason) {
      !reason.isCanceled &&
        (await this.setStateAsync({
          loading: false,
          error: reason
        }))
    }
  }

  async _fetchAllAvailablePolicies() {
    const response = await fetch(
      `${this.props.udaruUrl}/authorization/policies`,
      {
        headers: {
          authorization: this.props.authorization,
          org: this.props.org
        }
      }
    )

    if (!response.ok)
      throw new Error('there was an error fetching all policies.')

    const json = await response.json()

    return json
  }

  async fetchTeamPolicies(id) {
    const cancelablePromise = makeCancellable(this._fetchTeamPolicies(id))
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise

      await this.setStateAsync({
        loading: false,
        teamPolicies: response.policies
      })
    } catch (reason) {
      !reason.isCanceled &&
        (await this.setStateAsync({
          loading: false,
          error: reason
        }))
    }
  }

  async _fetchTeamPolicies(id) {
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
      throw new Error('there was an error fetching team policies.')

    const json = await response.json()

    return json
  }

  onSubmit = this.onSubmit.bind(this)
  async onSubmit(e) {
    e.preventDefault()
    const cancelablePromise = makeCancellable(this._saveTeam(this.props.id))
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      await cancelablePromise.promise

      await this.setStateAsync({
        loading: false,
        success: true
      })

      this._timers.push(
        setTimeout(() => this.setState({ success: false }), 3000)
      )
    } catch (reason) {
      if (!reason.isCanceled) {
        await this.setStateAsync({
          loading: false,
          error: reason
        })
      }
    }
  }

  async _saveTeam(id) {
    const response = await fetch(
      `${this.props.udaruUrl}/authorization/teams/${id}/policies`,
      {
        method: 'POST',
        headers: {
          authorization: this.props.authorization,
          org: this.props.org
        },
        body: JSON.stringify({
          policies: this.state.teamPolicies.map(p => p.id)
        })
      }
    )

    if (!response.ok) throw new Error('there was an error saving team.')

    const json = await response.json()

    return json
  }

  setSelectedTeamPolicies = this.setSelectedTeamPolicies.bind(this)
  setSelectedTeamPolicies(e) {
    this.setState({
      selectedTeamPolicies: [...e.target.selectedOptions].map(
        option => option.value
      )
    })
  }

  setSelectedAllPolicies = this.setSelectedAllPolicies.bind(this)
  setSelectedAllPolicies(e) {
    this.setState({
      selectedAllPolicies: [...e.target.selectedOptions].map(
        option => option.value
      )
    })
  }

  onMoveLeft = this.onMoveLeft.bind(this)
  onMoveLeft() {
    this.setState((state, props) => {
      return {
        teamPolicies: [
          ...state.teamPolicies.filter(
            p => !state.selectedTeamPolicies.find(policy => p.id === policy)
          )
        ],
        allPolicies: [
          ...state.allPolicies,
          ...state.selectedTeamPolicies.map(policy =>
            this.state.policies.find(p => p.id === policy)
          )
        ],
        selectedAllPolicies: [],
        selectedTeamPolicies: []
      }
    })
  }

  onMoveRight = this.onMoveRight.bind(this)
  onMoveRight() {
    this.setState((state, props) => {
      return {
        teamPolicies: [
          ...state.teamPolicies,
          ...state.selectedAllPolicies.map(policy =>
            this.state.policies.find(p => p.id === policy)
          )
        ],
        allPolicies: [
          ...state.allPolicies.filter(
            p => !state.selectedAllPolicies.find(policy => p.id === policy)
          )
        ],
        selectedAllPolicies: [],
        selectedTeamPolicies: []
      }
    })
  }

  onDismiss = this.onDismiss.bind(this)
  onDismiss() {
    this.setState({
      success: false
    })
  }

  render() {
    if (!this.state.allPolicies.length || this.state.allPolicies.error)
      return null
    return (
      <Box m={4}>
        <form onSubmit={this.onSubmit}>
          <PageHeader>
            {this.props.headerText} <small>{this.props.name}</small>
          </PageHeader>

          {this.state.success && (
            <Alert variant="success" onDismiss={this.onDismiss}>
              <Text.span bold>Team Successfully Updated!</Text.span>
            </Alert>
          )}
          {this.state.error && (
            <Alert variant="danger" onDismiss={this.onDismiss}>
              <Heading.h3 mt={0}>
                There was an error saving the team!
              </Heading.h3>
              <Text.span bold>REASON: {this.state.error.message}</Text.span>
            </Alert>
          )}
          <Flex>
            <Box w={0.5}>
              <Panel title="Available Policies">
                <InputGroup>
                  <Select
                    multiple
                    onChange={this.setSelectedAllPolicies}
                    style={{ height: '60vh' }}
                  >
                    {this.state.allPolicies
                      .sort((a, b) => {
                        if (a.name.toUpperCase() < b.name.toUpperCase()) {
                          return -1
                        }
                        if (a.name.toUpperCase() > b.name.toUpperCase()) {
                          return 1
                        }

                        return 0
                      })
                      .map(policy => (
                        <option key={policy.id} value={policy.id}>
                          {policy.name}
                        </option>
                      ))}
                  </Select>
                </InputGroup>
              </Panel>
            </Box>
            <Flex
              flexDirection="column"
              justifyContent="center"
              h="35vh"
              p="0 10px"
            >
              <Button style={{ margin: '15px 0' }} onClick={this.onMoveRight}>
                <Icon name="arrowRight" size={16} />
              </Button>
              <Button onClick={this.onMoveLeft}>
                <Icon name="arrowLeft" size={16} />
              </Button>
            </Flex>
            <Box w={0.5}>
              <Panel title="Active Policies">
                <InputGroup>
                  <Select
                    multiple
                    onChange={this.setSelectedTeamPolicies}
                    style={{ height: '60vh' }}
                  >
                    {this.state.teamPolicies
                      .sort((a, b) => {
                        if (a.name.toUpperCase() < b.name.toUpperCase()) {
                          return -1
                        }
                        if (a.name.toUpperCase() > b.name.toUpperCase()) {
                          return 1
                        }

                        return 0
                      })
                      .map(policy => (
                        <option key={policy.id} value={policy.id}>
                          {policy.name}
                        </option>
                      ))}
                  </Select>
                </InputGroup>
              </Panel>
            </Box>
          </Flex>
          <Flex style={{ margin: '15px 0 ' }}>
            <Box w={5 / 12}>
              <Button
                variant="primary"
                type="submit"
                disabled={this.state.loading}
              >
                SAVE
              </Button>
              <Button variant="link" onClick={this.props.onCancel}>
                CANCEL
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    )
  }
}

export default TeamsPoliciesMapper
