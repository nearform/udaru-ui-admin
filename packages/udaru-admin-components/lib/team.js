import React from 'react'
import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap'

class Team extends React.Component {
  render() {
    const { name, description, organizationId, usersCount } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <PageHeader>
              View Team <small>{name}</small>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Details</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p>
                  <strong>Name: </strong>
                  <span>{name}</span>
                </p>
                <p>
                  <strong>Organization ID: </strong>
                  <span>{organizationId}</span>
                </p>
                <p>
                  <strong>Number of Users: </strong>
                  <span>{usersCount}</span>
                </p>
                <p>
                  <strong>Description: </strong>
                  <span>{description}</span>
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Team
