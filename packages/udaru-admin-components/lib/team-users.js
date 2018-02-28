import React from 'react'
import { makeCancellable } from './makeCancellable'
import TeamUsersTable from './team-users-table'

class TeamUsers extends React.Component {
  state = {
    loading: true,
    error: null,
    users: null,
    currentPage: this.props.currentPage,
    sizePerPage: this.props.sizePerPage
  }

  static defaultProps = {
    currentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50]
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
        currentPage: page,
        sizePerPage: limit
      })
    } catch (reason) {
      console.log('reason', reason)

      if (!reason.isCanceled) {
        await this.setStateAsync({
          error: reason
        })
      }
    }
    await this.setStateAsync({
      error: null,
      loading: false
    })
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

    if (!response.ok) throw new Error(response.statusText)

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
        />
      )
    )
  }
}

export default TeamUsers
