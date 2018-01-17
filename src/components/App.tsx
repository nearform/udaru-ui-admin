import * as React from 'react'
import { css } from 'glamor'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'

import Header from './Header'
import Home from './Home'
import Settings from './Settings'
import Organizations from './Organizations'
import Teams from './Teams'

const logo = require('../logo.jpg')

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
                  <Route exact path="/teams" render={() => <Teams />} />
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
