import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import axios from 'axios'
import { css } from 'glamor'
import {
  Row,
  Col,
  PageHeader,
  Button,
  Alert,
  Glyphicon,
  Panel
} from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { ComponentUnmountedMsg, fetchPolicies } from '../network'
import RedirectToSettings from './RedirectToSettings'

export interface Statements {
  statements: {
    Statement: Statement[]
  }
}
export interface Statement {
  Action: string[]
  Effect: string
  Resource: string[]
}

export interface Policy {
  id: string
  version: string
  name: string
}

export interface PolicyAndStatements extends Policy, Statements {}

export interface Props {
  org?: string
}

export interface State {
  loading: boolean
  redirect: boolean
  error: Error | null
  policies: PolicyAndStatements[]
}

class Organizations extends React.Component<Props, State> {
  source = axios.CancelToken.source()

  state: State = {
    loading: false,
    redirect: false,
    error: null,
    policies: []
  }

  async componentWillReceiveProps(nextProps: Props): Promise<void> {
    if (this.props.org !== nextProps.org) {
      return await this.fetch()
    }
  }

  setStateAsync<T>(state: T): Promise<void> {
    return new Promise(resolve => this.setState(state, resolve))
  }

  async componentDidMount(): Promise<void> {
    return await this.fetch()
  }

  componentWillUnmount(): void {
    // cancel any outstanding ajax requests
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
      data: policies = []
    } = await fetchPolicies<PolicyAndStatements[]>(this.source, this.props.org)

    if (error && error.message === ComponentUnmountedMsg.RequestCancelled) {
      // return without setting state, page transition in progress
      return
    }

    return await this.setStateAsync<State>({
      loading: false,
      error,
      redirect,
      policies
    })
  }

  render() {
    const { policies, loading, error, redirect } = this.state
    const { org } = this.props

    if (redirect) return <RedirectToSettings />

    return (
      <Row>
        <Row>
          <PageHeader>
            Policies List <small>{org ? `${org}` : `Root User`}</small>
          </PageHeader>
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
                data={policies}
                pagination
                options={{
                  noDataText: 'No Policies Found.'
                }}
                striped
                search
                searchPlaceholder="Search For a Policy"
                expandColumnOptions={{
                  expandColumnVisible: true,
                  expandColumnComponent: ({ isExpandableRow, isExpanded }) =>
                    !isExpanded ? (
                      <Glyphicon glyph="plus" />
                    ) : (
                      <Glyphicon glyph="minus" />
                    )
                }}
                expandableRow={(row: PolicyAndStatements) =>
                  Boolean(row.statements.Statement.length)
                }
                expandComponent={row => {
                  return (
                    <React.Fragment>
                      <Row>
                        <Col xs={12}>
                          <h3>Statements:</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          {row.statements.Statement.map(
                            (statement: Statement, index: number) => (
                              <Panel
                                key={`${row.name}-${index}-${statement.Action}`}
                                {...css({ fontSize: '1.5rem' })}
                              >
                                <Panel.Heading>
                                  <Panel.Title componentClass="h1">
                                    {statement.Action}
                                  </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body
                                  {...css({
                                    ' strong': {
                                      display: 'block',
                                      float: 'left',
                                      width: '150px'
                                    }
                                  })}
                                >
                                  <p>
                                    <strong>Action:</strong>
                                    <span>{statement.Action}</span>
                                  </p>
                                  <p>
                                    <strong>Effect:</strong>
                                    <span>{statement.Effect}</span>
                                  </p>
                                  <p>
                                    <strong>Resource:</strong>
                                    <span>{statement.Resource}</span>
                                  </p>
                                </Panel.Body>
                              </Panel>
                            )
                          )}
                        </Col>
                      </Row>
                    </React.Fragment>
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
                <TableHeaderColumn dataField="version" dataSort>
                  Version
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
