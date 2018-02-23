import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  ButtonToolbar,
  Button,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'

class Toolbar extends React.Component {
  static propTypes = {
    onCreate: PropTypes.func,
    onView: PropTypes.func,
    disableView: PropTypes.bool,
    onUpdate: PropTypes.func,
    disableUpdate: PropTypes.bool,
    onDelete: PropTypes.func,
    disableDelete: PropTypes.bool
  }

  static defaultProps = {
    disableView: true,
    disableUpdate: true,
    disableDelete: true
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <ButtonToolbar>
              <Button bsStyle="success" onClick={this.props.onCreate}>
                New Team
              </Button>
              <OverlayTrigger
                trigger={
                  this.props.disableView ? ['hover', 'focus', 'click'] : []
                }
                placement="top"
                overlay={
                  <Tooltip id="view-tooltip">
                    Select a team to <strong>view</strong>.
                  </Tooltip>
                }
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0 10px'
                  }}
                >
                  <Button
                    bsStyle="primary"
                    onClick={this.props.onView}
                    disabled={this.props.disableView}
                    style={
                      this.props.disableView ? { pointerEvents: 'none' } : {}
                    }
                  >
                    View Team
                  </Button>
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                trigger={
                  this.props.disableUpdate ? ['hover', 'focus', 'click'] : []
                }
                placement="top"
                overlay={
                  <Tooltip id="update-tooltip">
                    Select a team to <strong>update</strong>.
                  </Tooltip>
                }
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0 10px 0 0'
                  }}
                >
                  <Button
                    bsStyle="info"
                    onClick={this.props.onUpdate}
                    disabled={this.props.disableUpdate}
                    style={
                      this.props.disableUpdate ? { pointerEvents: 'none' } : {}
                    }
                  >
                    Update Team
                  </Button>
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                trigger={
                  this.props.disableDelete ? ['hover', 'focus', 'click'] : []
                }
                placement="top"
                overlay={
                  <Tooltip id="delete-tooltip">
                    Select a team to <strong>delete</strong>.
                  </Tooltip>
                }
              >
                <div style={{ display: 'inline-block' }}>
                  <Button
                    bsStyle="danger"
                    onClick={this.props.onDelete}
                    disabled={this.props.disableDelete}
                    style={
                      this.props.disableDelete ? { pointerEvents: 'none' } : {}
                    }
                  >
                    Delete Team
                  </Button>
                </div>
              </OverlayTrigger>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Toolbar
