import React from 'react'
import { makeCancellable } from './makeCancellable'
import { Grid, Row, Col, Button, Glyphicon, PageHeader } from 'react-bootstrap'
import Team from './team'
import TeamUsersTable from './team-users-table'

class ViewNestedTeamDetails extends React.Component {
  state = {
    loading: false,
    loadingUsers: false,
    error: null,
    errorUsers: null,
    team: null,
    users: null,
    usersCurrentPage: this.props.usersCurrentPage,
    usersSizePerPage: this.props.sizePerPage
  }

  static defaultProps = {
    usersCurrentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50]
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
        team: response
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

    if (!response.ok) throw new Error(response.statusText)

    const json = await response.json()

    return json
  }

  async fetchTeamUsers(id, page, limit) {
    const cancelablePromise = makeCancellable(
      this._fetchTeamUsers(id, page, limit)
    )
    this._runningPromises.push(cancelablePromise)

    try {
      await this.setStateAsync({ loadingUsers: true })
      const response = await cancelablePromise.promise

      await this.setStateAsync({
        users: response,
        usersCurrentPage: page,
        usersSizePerPage: limit
      })
    } catch (reason) {
      console.log('reason', reason)

      if (!reason.isCanceled) {
        await this.setStateAsync({
          errorUsers: reason
        })
      }
    }
    await this.setStateAsync({
      errorUsers: null,
      loadingUsers: false
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

  async componentWillUnmount() {
    this._runningPromises.forEach(promise => promise.cancel())
  }

  async componentDidMount() {
    this.fetchTeam(this.props.id)
    this.fetchTeamUsers(
      this.props.id,
      this.state.usersCurrentPage,
      this.state.usersSizePerPage
    )
  }

  onPageChange = this.onPageChange.bind(this)
  onPageChange(page, sizePerPage) {
    this.fetchTeamUsers(this.props.id, page, sizePerPage)
  }

  onSizePerPageList = this.onSizePerPageList.bind(this)
  onSizePerPageList(sizePerPage) {
    this.fetchTeamUsers(this.props.id, this.state.usersCurrentPage, sizePerPage)
  }

  render() {
    return this.state.loading ? (
      <h3>Loading</h3>
    ) : this.state.error ? (
      <h3>error</h3>
    ) : (
      <React.Fragment>
        <Grid>
          <Row>
            <Col xs={12}>
              <PageHeader>
                View Team{' '}
                <small>{this.state.team && this.state.team.name}</small>
              </PageHeader>
            </Col>
            <Col xs={12}>
              <Button
                style={{ margin: '20px 0' }}
                onClick={() => this.props.onViewParent(this.props.parentTeamId)}
              >
                <Glyphicon glyph="arrow-up" /> View Parent
              </Button>
            </Col>
            <Team {...this.state.team} />

            {this.state.loadingUsers ? (
              <h3>Loading</h3>
            ) : this.state.errorUsers ? (
              <h3>error</h3>
            ) : (
              this.state.users && (
                <TeamUsersTable
                  data={this.state.users.data}
                  dataTotalSize={this.state.users.total}
                  currentPage={this.state.usersCurrentPage}
                  sizePerPage={this.state.usersSizePerPage}
                  sizePerPageList={this.props.sizePerPageList}
                  onPageChange={this.onPageChange}
                  onSizePerPageList={this.onSizePerPageList}
                />
              )
            )}

            <Col xs={12}>
              <Button bsStyle="link" onClick={this.props.onCancel}>
                Go Back
              </Button>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default ViewNestedTeamDetails
