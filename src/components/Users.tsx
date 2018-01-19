import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import axios from 'axios'
import { css } from 'glamor'
import { Row, Col, PageHeader, Button, Alert } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { ComponentUnmountedMsg, fetchUsers } from '../network'
import RedirectToSettings from './RedirectToSettings'

export interface User {
  description: string
  id: string
  name: string
}

export interface Props {
  org?: string
}

export interface State {
  loading: boolean
  redirect: boolean
  error: Error | null
  users: User[]
}

class Users extends React.Component<Props, State> {
  source = axios.CancelToken.source()

  state: State = {
    loading: false,
    redirect: false,
    error: null,
    users: []
  }

  setStateAsync<T>(state: T): Promise<void> {
    return new Promise(resolve => this.setState(state, resolve))
  }

  componentDidMount(): void {
    this.fetch()
  }

  componentWillUnmount(): void {
    this.source.cancel(ComponentUnmountedMsg.RequestCancelled)
  }

  async fetch(): Promise<void> {
    await this.setStateAsync<{ loading: boolean; error: null }>({
      loading: true,
      error: null
    })
    const { error = null, redirect = false, data = [] } = await fetchUsers<
      User[]
    >(this.source, this.props.org)

    if (error && error.message === ComponentUnmountedMsg.RequestCancelled) {
      return
    }

    await this.setStateAsync<State>({
      loading: false,
      error,
      redirect,
      users: data
    })
  }

  render() {
    const { users, loading, error, redirect } = this.state

    if (redirect) return <RedirectToSettings />

    return (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>
              User List{' '}
              <small>
                {this.props.org ? `${this.props.org}` : `Root User`}
              </small>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              This page provides you with a list of all users in an
              organization.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                {error && (
                  <Alert bsStyle="danger">
                    There was an <strong>error</strong> fetching user. Please
                    try again.
                  </Alert>
                )}
              </Col>
              <Col xs={12}>
                <Button onClick={() => this.fetch()} disabled={loading}>
                  Refresh
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row {...css({ marginTop: '30px' })}>
          {loading ? (
            <Col xsOffset={2} xs={2}>
              <h1>Loading...</h1>
            </Col>
          ) : (
            <Col xs={12}>
              <BootstrapTable
                data={users}
                pagination
                options={{
                  noDataText: 'No Users Found.'
                }}
                striped
                search
                searchPlaceholder="Search For a User"
              >
                <TableHeaderColumn
                  dataField="id"
                  isKey
                  dataAlign="center"
                  dataSort
                >
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort>
                  Name
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          )}
        </Row>
      </Row>
    )
  }
}

export default Users
