import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import axios from 'axios'
import { css } from 'glamor'
import { Redirect } from 'react-router-dom'
import { Row, Col, PageHeader, Button, Alert } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { ComponentUnmountedMsg, fetchTeams } from '../network'

export interface User {
  id: string
  name: string
}

export interface Policy {
  id: string
  version: string
  name: string
}

export interface Team {
  id: string
  name: string
  description: string
  path: string
  users: User[]
  policies: Policy[]
  organizationId: string
  usersCount: number
}

export interface Props {
  org?: string
}

export interface State {
  loading: boolean
  redirect: boolean
  error: Error | null
  teams: Team[]
}

class Teams extends React.Component<Props, State> {
  source = axios.CancelToken.source()

  state: State = {
    loading: false,
    redirect: false,
    error: null,
    teams: []
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (this.props.org !== nextProps.org) {
      this.fetch()
    }
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
    const { error = null, redirect = false, data = [] } = await fetchTeams<
      Team[]
    >(this.source, this.props.org)

    if (error && error.message === ComponentUnmountedMsg.RequestCancelled) {
      return
    }

    await this.setStateAsync<State>({
      loading: false,
      error,
      redirect,
      teams: data
    })
  }

  render() {
    const { teams, loading, error, redirect } = this.state

    if (redirect) return <Redirect to="/settings" />

    return (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>
              {this.props.org ? `Teams List ${this.props.org}` : `Teams List`}
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              This page provides you with a list of all teams from the current
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
                    There was an <strong>error</strong> fetching organizations.
                    Please try again.
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
                data={teams}
                pagination
                options={{ noDataText: 'No Teams Found.' }}
                striped
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
                <TableHeaderColumn dataField="description" dataSort>
                  Description
                </TableHeaderColumn>
                <TableHeaderColumn dataField="path" dataSort>
                  Path
                </TableHeaderColumn>
                <TableHeaderColumn dataField="usersCount" dataSort>
                  Users Count
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          )}
        </Row>
      </Row>
    )
  }
}

export default Teams
