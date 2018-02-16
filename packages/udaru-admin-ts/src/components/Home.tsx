import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <PageHeader>Udaru Admin</PageHeader>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <p>
              To get started, please configure udaru url and root user:{' '}
              <strong>
                <Link to="/settings">
                  <Button>Go To Settings</Button>
                </Link>
              </strong>
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs={8}>
            <h3>Supported Functionality:</h3>
            <Col xsOffset={2} xs={8}>
              <ListGroup>
                <ListGroupItem>All Organizations (Read)</ListGroupItem>
                <ListGroupItem>A Single Organization (Read)</ListGroupItem>
                <ListGroupItem>Users per Organization (Read)</ListGroupItem>
                <ListGroupItem>Teams per Organization (Read)</ListGroupItem>
                <ListGroupItem>Policies per Organization (Read)</ListGroupItem>
              </ListGroup>
            </Col>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Home
