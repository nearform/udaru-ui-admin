import React from 'react'
import { makeCancellable } from './makeCancellable'
import TeamUsersTable from './team-users-table'

class TeamUsers extends React.Component {
  state = {
    loading: true,
    error: null,
    users: null,
    currentPage: this.props.currentPage,
    sizePerPage: this.props.sizePerPage,
    originalUsers: null
  }

  static defaultProps = {
    currentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50],
    searchDelayTime: 300
  }

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve))
  }

  _runningPromises = []

  async fetchTeamUsers(id, page, limit) {
    const cancelablePromise = makeCancellable(
      this._fetchTeamUsers(id, page, limit)
    )
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise

      await this.setStateAsync({
        users: response,
        originalUsers: response,
        currentPage: page,
        sizePerPage: limit,
        error: null,
        loading: false
      })
    } catch (reason) {
      if (!reason.isCanceled) {
        await this.setStateAsync({
          error: reason,
          loading: false
        })
      }
    }
  }

  async _fetchTeamUsers(id, page, limit) {
    const response = await fetch(
      `${
        this.props.udaruUrl
      }/authorization/teams/${id}/users?page=${page}&limit=${limit}`,
      {
        headers: {
          authorization: this.props.authorization,
          org: this.props.org
        }
      }
    )

    if (!response.ok) throw new Error('error loading the team users.')

    const json = await response.json()

    return json
  }

  componentDidMount() {
    this.fetchTeamUsers(
      this.props.id,
      this.state.currentPage,
      this.state.sizePerPage
    )
  }

  componentWillUnmount() {
    this._runningPromises.forEach(promise => promise.cancel())
  }

  onPageChange = this.onPageChange.bind(this)
  onPageChange(page, sizePerPage) {
    this.fetchTeamUsers(this.props.id, page, sizePerPage)
  }

  onSizePerPageList = this.onSizePerPageList.bind(this)
  onSizePerPageList(sizePerPage) {
    this.fetchTeamUsers(this.props.id, this.state.currentPage, sizePerPage)
  }

  resetInitialUsers = this.resetInitialUsers.bind(this)
  resetInitialUsers() {
    this.setState(state => ({
      users: state.originalUsers
    }))
  }

  onSearchChange = this.onSearchChange.bind(this)
  async onSearchChange(searchText) {
    if (searchText === '') {
      return this.resetInitialUsers()
    }

    try {
      const { udaruUrl, authorization, org, id } = this.props

      const response = await fetch(
        `${udaruUrl}/authorization/teams/${id}/users/search?query=${searchText}`,
        {
          headers: {
            authorization,
            org
          }
        }
      )

      if (!response.ok) {
        throw new Error('There was an error searching for that user in a team.')
      }

      const json = await response.json()

      this.setState({
        users: json
      })
    } catch (error) {
      return this.resetInitialUsers()
    }
  }

  render() {
    return this.state.loading ? (
      <h3>Loading</h3>
    ) : this.state.error ? (
      <h3>error</h3>
    ) : (
      this.state.users && (
        <TeamUsersTable
          data={this.state.users.data}
          dataTotalSize={this.state.users.total}
          currentPage={this.state.currentPage}
          sizePerPage={this.state.sizePerPage}
          sizePerPageList={this.props.sizePerPageList}
          onPageChange={this.onPageChange}
          onSizePerPageList={this.onSizePerPageList}
          searchDelayTime={this.props.searchDelayTime}
          onSearchChange={this.onSearchChange}
        />
      )
    )
  }
}

export default TeamUsers
