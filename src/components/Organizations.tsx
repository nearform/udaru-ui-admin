import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import { css } from 'glamor'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, PageHeader, Button, Glyphicon, Alert } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { fetchOrganizations } from '../network'

export interface Organization {
  description: string
  id: string
  name: string
}

export interface State {
  loading: boolean
  redirect: boolean
  error: Error | null
  organizations: Organization[]
}

class Organizations extends React.Component<{}, State> {
  state: State = {
    loading: false,
    redirect: false,
    error: null,
    organizations: []
  }

  setStateAsync<T>(state: T): Promise<void> {
    return new Promise(resolve => this.setState(state, resolve))
  }

  componentDidMount(): void {
    this.fetch()
  }

  async fetch(): Promise<void> {
    await this.setStateAsync<{ loading: boolean; error: null }>({
      loading: true,
      error: null
    })
    const {
      error = null,
      redirect = false,
      data = []
    } = await fetchOrganizations<Array<Organization>>()

    await this.setStateAsync<State>({
      loading: false,
      error,
      redirect,
      organizations: data
    })
  }

  render() {
    const { organizations, loading, error, redirect } = this.state

    if (redirect) return <Redirect to="/settings" />

    return (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>Organizations List</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              This page provides you with a list of all the orgs in the udaru
              catalog.
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
                data={organizations}
                pagination
                options={{ noDataText: 'No Organizations Found.' }}
              >
                <TableHeaderColumn
                  dataField="id"
                  isKey
                  dataAlign="center"
                  dataSort
                  dataFormat={(cell, row) => {
                    return (
                      <Link to={`/organizations/${cell}`}>
                        <Button bsStyle="success">{cell}</Button>
                      </Link>
                    )
                  }}
                >
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="id"
                  dataAlign="center"
                  dataFormat={(cell, row) => {
                    return (
                      <Link to={`/policies/${cell}`}>
                        <Button bsStyle="success">
                          <Glyphicon glyph="info-sign" />
                        </Button>
                      </Link>
                    )
                  }}
                >
                  Policies
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="id"
                  dataAlign="center"
                  dataFormat={(cell, row) => {
                    return (
                      <Link to={`/teams/${cell}`}>
                        <Button bsStyle="success">
                          <Glyphicon glyph="user" />
                        </Button>
                      </Link>
                    )
                  }}
                >
                  Teams
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="id"
                  dataAlign="center"
                  dataFormat={(cell, row) => {
                    return (
                      <Link to={`/users/${cell}`}>
                        <Button bsStyle="success">
                          <Glyphicon glyph="user" />
                        </Button>
                      </Link>
                    )
                  }}
                >
                  Users
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataSort>
                  Description
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          )}
        </Row>
      </Row>
    )
  }
}

export default Organizations
