import * as React from 'react'
import { css } from 'glamor'
import { Row, Col, PageHeader } from 'react-bootstrap'

class NoMatch extends React.Component<{}, {}> {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <PageHeader {...css({ border: 'none' })}>
            404 - PAGE NOT FOUND
          </PageHeader>
        </Col>
      </Row>
    )
  }
}

export default NoMatch
