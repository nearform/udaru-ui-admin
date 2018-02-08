import React from 'react'
import PropTypes from 'prop-types'
import RemotePaging from './remote-paging'

const LoadingCmp = () => <h1>Loading...</h1>
const ErrorCmp = () => <h1>There was an error fetching teams.</h1>

// https://github.com/facebook/react/issues/5465#issuecomment-157888325
const makeCancelable = promise => {
  let hasCanceled_ = false

  return {
    promise: new Promise((resolve, reject) => {
      promise.then(
        val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
        error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
      )
    }),
    cancel() {
      hasCanceled_ = true
    }
  }
}

class TeamsTable extends React.Component {
  onPageChange = this.onPageChange.bind(this)
  onSizePerPageList = this.onSizePerPageList.bind(this)

  state = {
    loading: false,
    data: [],
    error: null,
    dataTotalSize: 0,
    sizePerPage: this.props.sizePerPage,
    currentPage: this.props.currentPage
  }

  static propTypes = {
    currentPage: PropTypes.number,
    sizePerPage: PropTypes.number,
    sizePerPageList: PropTypes.arrayOf(PropTypes.number),
    udaruUrl: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    org: PropTypes.string,
    Loading: PropTypes.func,
    Error: PropTypes.func
  }

  static defaultProps = {
    currentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50, 100],
    udaruUrl: '',
    authorization: '',
    org: '',
    Loading: LoadingCmp,
    Error: ErrorCmp
  }

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve))
  }

  _runningPromises = []

  async fetchTeams(page, limit) {
    const cancelablePromise = makeCancelable(this._fetchTeams(page, limit))
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise
      await this.setStateAsync({
        loading: false,
        data: response.data,
        dataTotalSize: response.total,
        currentPage: page,
        sizePerPage: limit
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

  async _fetchTeams(page, limit) {
    const response = await fetch(
      `${this.props.udaruUrl}/authorization/teams?page=${page}&limit=${limit}`,
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

  async componentWillUnmount() {
    this._runningPromises.forEach(promise => promise.cancel())
  }

  async componentDidMount() {
    this.fetchTeams(this.state.currentPage, this.state.sizePerPage)
  }

  onPageChange(page, sizePerPage) {
    this.fetchTeams(page, sizePerPage)
  }

  onSizePerPageList(sizePerPage) {
    this.fetchTeams(this.state.currentPage, sizePerPage)
  }

  render() {
    const { Loading, Error } = this.props

    return this.state.loading ? (
      <Loading />
    ) : this.state.error ? (
      <Error />
    ) : (
      <RemotePaging
        data={this.state.data}
        onPageChange={this.onPageChange}
        onSizePerPageList={this.onSizePerPageList}
        sizePerPage={this.state.sizePerPage}
        currentPage={this.state.currentPage}
        dataTotalSize={this.state.dataTotalSize}
        sizePerPageList={this.props.sizePerPageList}
      />
    )
  }
}

export default TeamsTable
