import * as React from 'react'
import { css } from 'glamor'
import { Grid, Row, Col } from 'react-bootstrap'
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom'

import Header from './Header'
import NoMatch from './NoMatch'
import Home from './Home'
import Settings from './Settings'
import Organizations from './Organizations'
import Teams from './Teams'
import SingleOrganization from './SingleOrganization'
import Users from './Users'
import Policies from './Policies'

const logo = require('../logo.jpg')

export interface SingleOrganizationRouteInfo {
  id: string
}

export interface TeamsRouteInfo {
  org: string
}

export interface UsersRouteInfo {
  org: string
}

export interface PoliciesRouteInfo {
  org: string
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Grid>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12}>
                    <header {...css({ marginBottom: '30px' })}>
                      <img src={logo} className="App-logo" alt="logo" />
                    </header>
                  </Col>
                </Row>
                <Switch>
                  <Route exact path="/" render={() => <Home />} />
                  <Route exact path="/settings" render={() => <Settings />} />
                  <Route
                    exact
                    path="/organizations"
                    render={() => <Organizations />}
                  />
                  <Route
                    exact
                    path="/organization/:id"
                    render={({
                      match
                    }: RouteComponentProps<SingleOrganizationRouteInfo>) => {
                      return (
                        <SingleOrganization organizationId={match.params.id} />
                      )
                    }}
                  />
                  <Route exact path="/teams" render={() => <Teams />} />
                  <Route
                    exact
                    path="/teams/:org"
                    render={({
                      match
                    }: RouteComponentProps<TeamsRouteInfo>) => (
                      <Teams org={match.params.org} />
                    )}
                  />
                  <Route exact path="/users" render={() => <Users />} />
                  <Route
                    exact
                    path="/users/:org"
                    render={({
                      match
                    }: RouteComponentProps<UsersRouteInfo>) => (
                      <Users org={match.params.org} />
                    )}
                  />
                  <Route exact path="/policies" render={() => <Policies />} />
                  <Route
                    exact
                    path="/policies/:org"
                    render={({
                      match
                    }: RouteComponentProps<PoliciesRouteInfo>) => (
                      <Policies org={match.params.org} />
                    )}
                  />
                  <Route render={() => <NoMatch />} />
                </Switch>
              </Col>
            </Row>
          </Grid>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App
