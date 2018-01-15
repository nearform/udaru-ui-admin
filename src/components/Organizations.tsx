import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import * as React from 'react';
import { css } from 'glamor';
import { Link } from 'react-router-dom';
import { Row, Col, PageHeader, Button, Glyphicon } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function timeout(ms: Number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchOrg() {
  const url = 'http://localhost:8080/authorization/organizations';
  const headers = {
    authorization: 'ROOTid'
  };

  const response = await fetch(url, {
    method: 'GET',
    headers,
    mode: 'cors'
  });

  await timeout(500);

  if (!response.ok) {
    throw new Error('bad network request');
  }

  return await response.json();
}

type State = {
  loading: Boolean;
  organizations: Array<{
    description: String;
    id: String;
    name: String;
  }>;
};

class Organizations extends React.Component<{}, State> {
  state: State = {
    loading: false,
    organizations: []
  };

  async componentDidMount() {
    this.refetch();
  }

  async refetch() {
    await this.setState({ loading: true });
    const organizations = await fetchOrg();

    this.setState({
      loading: false,
      organizations: organizations.data
    });
  }

  render() {
    const { organizations, loading } = this.state;

    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>Organizations list</PageHeader>
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
            <Button bsStyle="primary" onClick={() => this.refetch()}>
              Refresh
            </Button>
          </Col>
        </Row>
        <Row {...css({ marginTop: '30px' })}>
          <Col xs={12}>
            <BootstrapTable
              data={organizations}
              pagination={true}
              options={{ noDataText: 'No Organizations Found.' }}
            >
              <TableHeaderColumn
                dataField="id"
                isKey={true}
                dataAlign="center"
                dataSort={true}
                dataFormat={(cell, row) => {
                  return (
                    <Link to={`/organizations/${cell}`}>
                      <Button bsStyle="success">{cell}</Button>
                    </Link>
                  );
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
                  );
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
                  );
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
                  );
                }}
              >
                Users
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort={true}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="description" dataSort={true}>
                Description
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default Organizations;
