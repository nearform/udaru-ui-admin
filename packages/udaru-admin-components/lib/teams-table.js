import React from 'react'
import PropTypes from 'prop-types'
import RemotePaging from './remote-paging'
import Toolbar from './toolbar'
import CreateTeam from './create-team'
import UpdateTeam from './update-team'
import DeleteTeam from './delete-team'
import ViewTeam from './view-team'
import ViewNestedTeam from './view-nested-team'

import { makeCancellable } from './makeCancellable'

const LoadingCmp = () => <h1>Loading...</h1>
const ErrorCmp = () => <h1>There was an error fetching teams.</h1>

class TeamsTable extends React.Component {
  state = {
    loading: true,
    data: [],
    originalData: [],
    error: null,
    dataTotalSize: 0,
    originalDataTotalSize: 0,
    sizePerPage: this.props.sizePerPage,
    currentPage: this.props.currentPage,
    selectedRow: null,
    view: this.props.view,
    parentTeamId: null,
    nestedTeamId: null,
    viewId: null
  }

  static propTypes = {
    currentPage: PropTypes.number,
    sizePerPage: PropTypes.number,
    sizePerPageList: PropTypes.arrayOf(PropTypes.number),
    udaruUrl: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    org: PropTypes.string,
    Loading: PropTypes.func,
    Error: PropTypes.func,
    view: PropTypes.oneOf(['CREATE', 'READ', 'UPDATE', 'DELETE', 'LIST']),
    searchDelayTime: PropTypes.number,
    expandRows: PropTypes.bool,
    expandComponent: PropTypes.func
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
    expandRows: true,
    expandComponent: ViewNestedTeam
  }

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve))
  }

  _runningPromises = []

  async fetchTeams(page, limit) {
    const cancelablePromise = makeCancellable(this._fetchTeams(page, limit))
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loading: true })
      const response = await cancelablePromise.promise
      await this.setStateAsync({
        loading: false,
        data: response.data,
        originalData: response.data,
        dataTotalSize: response.total,
        originalDataTotalSize: response.total,
        currentPage: page,
        sizePerPage: limit,
        selectedRow: null
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

    if (!response.ok) throw new Error('there was an error fetching teams.')

    const json = await response.json()

    return json
  }

  componentWillUnmount() {
    this._runningPromises.forEach(promise => promise.cancel())
  }

  componentDidMount() {
    return this.fetchTeams(this.state.currentPage, this.state.sizePerPage)
  }

  onPageChange = this.onPageChange.bind(this)
  onPageChange(page, sizePerPage) {
    this.fetchTeams(page, sizePerPage)
  }

  onSizePerPageList = this.onSizePerPageList.bind(this)
  onSizePerPageList(sizePerPage) {
    this.fetchTeams(this.state.currentPage, sizePerPage)
  }

  onSelect = this.onSelect.bind(this)
  onSelect(selectedRow) {
    this.setState({
      selectedRow
    })
  }

  onCreate = this.onCreate.bind(this)
  onCreate() {
    this.setState({
      view: 'CREATE'
    })
  }

  onView = this.onView.bind(this)
  onView() {
    this.setState(state => {
      return {
        view: 'READ',
        viewId: state.selectedRow.id
      }
    })
  }

  onNestedView = this.onNestedView.bind(this)
  onNestedView(parentId, nestedId) {
    this.setState({
      view: 'READ',
      viewId: nestedId,
      parentTeamId: parentId
    })
  }

  onViewParent = this.onViewParent.bind(this)
  onViewParent(parentTeamId) {
    this.setState({
      view: 'READ',
      viewId: parentTeamId,
      parentTeamId: null
    })
  }

  onUpdate = this.onUpdate.bind(this)
  onUpdate() {
    this.setState({
      view: 'UPDATE'
    })
  }

  onDelete = this.onDelete.bind(this)
  onDelete() {
    this.setState({
      view: 'DELETE'
    })
  }

  onCancel = this.onCancel.bind(this)
  onCancel() {
    this.setState({
      view: 'LIST',
      selectedRow: null
    })
    this.fetchTeams(this.state.currentPage, this.state.sizePerPage)
  }

  resetInitialData = this.resetInitialData.bind(this)
  resetInitialData() {
    this.setState({
      data: this.state.originalData,
      dataTotalSize: this.state.originalDataTotalSize
    })
  }

  onSearchChange = this.onSearchChange.bind(this)
  async onSearchChange(searchText) {
    if (searchText === '') {
      return this.resetInitialData()
    }

    try {
      const { udaruUrl, authorization, org } = this.props
      const response = await fetch(
        `${udaruUrl}/authorization/teams/search?query=${searchText}`,
        {
          headers: {
            authorization,
            org
          }
        }
      )

      if (!response.ok) {
        throw new Error('There was an error searching for that team.')
      }

      const json = await response.json()
      const { data = [], total: dataTotalSize = 0 } = json

      return this.setState({
        data,
        dataTotalSize
      })
    } catch (error) {
      return this.resetInitialData()
    }
  }

  render() {
    const { Loading, Error } = this.props

    return this.state.loading ? (
      <Loading />
    ) : this.state.error ? (
      <Error />
    ) : this.state.view === 'CREATE' ? (
      <CreateTeam
        udaruUrl={this.props.udaruUrl}
        authorization={this.props.authorization}
        org={this.props.org}
        onCancel={this.onCancel}
      />
    ) : this.state.view === 'READ' ? (
      <ViewTeam
        udaruUrl={this.props.udaruUrl}
        authorization={this.props.authorization}
        org={this.props.org}
        id={this.state.viewId}
        onCancel={this.onCancel}
        parentTeamId={this.state.parentTeamId}
        onViewParent={this.onViewParent}
      />
    ) : this.state.view === 'UPDATE' ? (
      <UpdateTeam
        udaruUrl={this.props.udaruUrl}
        authorization={this.props.authorization}
        org={this.props.org}
        team={this.state.selectedRow}
        onCancel={this.onCancel}
      />
    ) : this.state.view === 'DELETE' ? (
      <DeleteTeam
        udaruUrl={this.props.udaruUrl}
        authorization={this.props.authorization}
        org={this.props.org}
        id={this.state.selectedRow.id}
        name={this.state.selectedRow.name}
        onCancel={this.onCancel}
      />
    ) : this.state.view === 'LIST' ? (
      <React.Fragment>
        <Toolbar
          onCreate={this.onCreate}
          onView={this.onView}
          disableView={!Boolean(this.state.selectedRow)}
          onUpdate={this.onUpdate}
          disableUpdate={!Boolean(this.state.selectedRow)}
          onDelete={this.onDelete}
          disableDelete={!Boolean(this.state.selectedRow)}
        />
        <div style={{ margin: '30px 0' }} />
        <RemotePaging
          data={this.state.data}
          udaruUrl={this.props.udaruUrl}
          authorization={this.props.authorization}
          org={this.props.org}
          onPageChange={this.onPageChange}
          onSizePerPageList={this.onSizePerPageList}
          onSelect={this.onSelect}
          sizePerPage={this.state.sizePerPage}
          currentPage={this.state.currentPage}
          dataTotalSize={this.state.dataTotalSize}
          sizePerPageList={this.props.sizePerPageList}
          searchDelayTime={this.props.searchDelayTime}
          onSearchChange={this.onSearchChange}
          expandRows={this.props.expandRows}
          ExpandComponent={this.props.expandComponent}
          expandComponentOnClick={this.onNestedView}
        />
      </React.Fragment>
    ) : (
      <Error />
    )
  }
}

export default TeamsTable
