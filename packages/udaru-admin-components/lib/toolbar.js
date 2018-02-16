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
    onUpdate: PropTypes.func,
    disableUpdate: PropTypes.bool,
    onDelete: PropTypes.func,
    disableDelete: PropTypes.bool
  }

  render() {
    return (
      <Grid style={{ padding: '15px 0' }}>
        <Row>
          <Col xs={12}>
            <ButtonToolbar>
              <Button bsStyle="success" onClick={this.props.onCreate}>
                Create Team
              </Button>
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
                    padding: '0 10px'
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
