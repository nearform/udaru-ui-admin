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
import { ErrorInfo } from 'react'

const logo = require('../logo.jpg')

export interface State {
  hasError: boolean
}

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

class App extends React.Component<{}, State> {
  state: State = {
    hasError: false
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Error Caught', error)
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
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
                {hasError ? (
                  <h3>Oops, it looks like something has gone wrong</h3>
                ) : (
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={(): JSX.Element => <Home />}
                    />
                    <Route
                      exact
                      path="/settings"
                      render={(): JSX.Element => <Settings />}
                    />
                    <Route
                      exact
                      path="/organizations"
                      render={(): JSX.Element => <Organizations />}
                    />
                    <Route
                      exact
                      path="/organization/:id"
                      render={({
                        match
                      }: RouteComponentProps<
                        SingleOrganizationRouteInfo
                      >): JSX.Element => (
                        <SingleOrganization organizationId={match.params.id} />
                      )}
                    />
                    <Route
                      exact
                      path="/teams"
                      render={(): JSX.Element => <Teams />}
                    />
                    <Route
                      exact
                      path="/teams/:org"
                      render={({
                        match
                      }: RouteComponentProps<TeamsRouteInfo>): JSX.Element => (
                        <Teams org={match.params.org} />
                      )}
                    />
                    <Route exact path="/users" render={() => <Users />} />
                    <Route
                      exact
                      path="/users/:org"
                      render={({
                        match
                      }: RouteComponentProps<UsersRouteInfo>): JSX.Element => (
                        <Users org={match.params.org} />
                      )}
                    />
                    <Route
                      exact
                      path="/policies"
                      render={(): JSX.Element => <Policies />}
                    />
                    <Route
                      exact
                      path="/policies/:org"
                      render={({
                        match
                      }: RouteComponentProps<
                        PoliciesRouteInfo
                      >): JSX.Element => <Policies org={match.params.org} />}
                    />
                    <Route render={(): JSX.Element => <NoMatch />} />
                  </Switch>
                )}
              </Col>
            </Row>
          </Grid>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App
