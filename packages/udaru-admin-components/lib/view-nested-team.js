import React from 'react'
import PropTypes from 'prop-types'
import NestedTeamTable from './nested-team-table'
import { makeCancellable } from './makeCancellable'

const LoadingCmp = () => <h1>Loading...</h1>
const ErrorCmp = () => <h1>There was an error fetching teams.</h1>

class ViewNestedTeam extends React.Component {
  state = {
    data: [],
    total: 0,
    error: null,
    loading: true,
    sizePerPage: this.props.sizePerPage,
    currentPage: this.props.currentPage
  }

  static defaultProps = {
    currentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50, 100],
    udaruUrl: '',
    authorization: '',
    org: '',
    Loading: LoadingCmp,
    Error: ErrorCmp,
    view: 'LIST',
    searchDelayTime: 300,
    expandRows: true
  }

  static propTypes = {
    parentTeamId: PropTypes.string.isRequired,
    parentName: PropTypes.string.isRequired,
    udaruUrl: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    org: PropTypes.string.isRequired,
    sizePerPage: PropTypes.number,
    currentPage: PropTypes.number
  }

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve))
  }

  _runningPromises = []

  async fetchTeam(id, page, limit) {
    const cancelablePromise = makeCancellable(this._fetchTeam(id, page, limit))
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise
      await this.setStateAsync({
        loading: false,
        total: response.total,
        data: response.data
      })
    } catch (reason) {
      console.log('reason', reason)

      if (!reason.isCanceled) {
        await this.setStateAsync({
          loading: false,
          error: reason
        })
      }
    }
  }

  async _fetchTeam(id, page, limit) {
    const response = await fetch(
      `${
        this.props.udaruUrl
      }/authorization/teams/${id}/nested?page=${page}&limit=${limit}`,
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
    const { parentTeamId } = this.props
    const { currentPage, sizePerPage } = this.state

    this.fetchTeam(parentTeamId, currentPage, sizePerPage)
  }

  componentWillUnmount() {
    this._runningPromises.forEach(promise => promise.cancel())
  }

  render() {
    return (
      <NestedTeamTable
        data={this.state.data}
        dataTotalSize={this.state.total}
        parentName={this.props.parentName}
        parentTeamId={this.props.parentTeamId}
        expandComponentOnClick={this.props.expandComponentOnClick}
      />
    )
  }
}

export default ViewNestedTeam
