import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import { css } from 'glamor'
import { Row, Col, PageHeader, Button, Glyphicon } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

function timeout(ms: Number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchTeams() {
  const url = 'http://localhost:8080/authorization/teams'
  const headers = {
    authorization: 'ROOTid',
    org: 'WONKA'
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      mode: 'cors'
    })

    await timeout(500)

    if (!response.ok) {
      throw new Error('bad network request')
    }

    return await response.json()
  } catch (error) {
    return error
  }
}

async function fetchTeam(id: Number) {
  const url = `http://localhost:8080/authorization/teams/${id}`
  const headers = {
    authorization: 'ROOTid',
    org: 'WONKA'
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
    mode: 'cors'
  })

  await timeout(500)

  if (!response.ok) {
    throw new Error('bad network request')
  }

  return await response.json()
}

type State = {
  loading: boolean
  error: Error | null
  team: {
    id: string
    name: string
    description: string
    path: string
    organizationId: string
    users: Array<{
      id: string
      name: string
    }>
    policies: Array<{
      id: string
      name: string
      version: string
      variables: {}
    }>
    usersCount: 1
  } | null

  teams: Array<{
    description: string
    id: string
    name: string
    organizationId: string
    path: string
    usersCount: Number
  }>
}

class Teams extends React.Component<{}, State> {
  state: State = {
    loading: false,
    error: null,
    teams: [],
    team: null
  }

  async componentDidMount() {
    this.refetch()
  }

  async fetchTeam(id: Number) {
    const team = await fetchTeam(id)
    console.log('team', team)

    this.setState({
      loading: false,
      team: team.data
    })
  }

  async refetch() {
    await this.setState({ loading: true })
    const teams = await fetchTeams()

    teams instanceof Error
      ? this.setState({
          loading: false,
          error: teams
        })
      : this.setState({
          loading: false,
          teams: teams.data
        })
  }

  render() {
    const { teams, loading, error } = this.state

    return loading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>There was an error retreiving this data.</h1>
    ) : (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>Teams List</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              This page provides you with a list of active teams for the
              selected organization.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button bsStyle="primary" onClick={() => this.refetch()}>
              Refresh
            </Button>
          </Col>
        </Row>
        <Row {...css({ marginTop: '30px' })}>
          <Col xs={12}>
            <BootstrapTable
              data={teams}
              pagination
              options={{ noDataText: 'No Teams Found.' }}
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
              expandComponent={row => <h1>Expanded {row.name}</h1>}
            >
              <TableHeaderColumn dataField="id" isKey dataSort>
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
        </Row>
      </Row>
    )
  }
}

export default Teams
