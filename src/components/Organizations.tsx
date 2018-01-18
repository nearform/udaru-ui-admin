import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import axios from 'axios'
import { css } from 'glamor'
import { Link, Redirect } from 'react-router-dom'
import {
  Row,
  Col,
  PageHeader,
  ButtonGroup,
  Button,
  Glyphicon,
  Alert
} from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { ComponentUnmountedMsg, fetchOrganizations } from '../network'

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
  source = axios.CancelToken.source()

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

  componentWillUnmount(): void {
    this.source.cancel(ComponentUnmountedMsg.RequestCancelled)
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
    } = await fetchOrganizations<Organization[]>(this.source)

    if (error && error.message === ComponentUnmountedMsg.RequestCancelled) {
      return
    }

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
              This page provides you with a list of all the organizations in the
              udaru catalog.
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
                striped
                expandColumnOptions={{
                  expandColumnVisible: true,
                  expandColumnComponent: ({ isExpandableRow, isExpanded }) =>
                    !isExpanded ? (
                      <Glyphicon glyph="plus" />
                    ) : (
                      <Glyphicon glyph="minus" />
                    )
                }}
                expandableRow={row => true}
                expandComponent={row => {
                  return (
                    <Row>
                      <Col xs={12}>
                        <h3>View Details:</h3>

                        <ButtonGroup
                          {...css({
                            textAlign: 'center',
                            marginBottom: '20px',
                            ' a': { margin: '0 10px' }
                          })}
                        >
                          <Link to={`/organization/${row.id}`}>
                            <Button bsStyle="success">
                              Organization: {row.id}
                            </Button>
                          </Link>

                          <Link to={`/policies/${row.id}`}>
                            <Button bsStyle="success">
                              Policies <Glyphicon glyph="info-sign" />
                            </Button>
                          </Link>

                          <Link to={`/teams/${row.id}`}>
                            <Button bsStyle="success">
                              Teams <Glyphicon glyph="user" />
                            </Button>
                          </Link>

                          <Link to={`/users/${row.id}`}>
                            <Button bsStyle="success">
                              Users <Glyphicon glyph="user" />
                            </Button>
                          </Link>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  )
                }}
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
              </BootstrapTable>
            </Col>
          )}
        </Row>
      </Row>
    )
  }
}

export default Organizations
