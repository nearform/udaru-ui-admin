import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, ButtonToolbar, Tooltip } from './components'

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
      <Box p="15px 0">
        <ButtonToolbar>
          <Button variant="success" onClick={this.props.onCreate}>
            New Team
          </Button>
          <Tooltip
            trigger={this.props.disableView ? ['hover', 'focus', 'click'] : []}
            placement="top"
            overlay={
              <div>
                Select a team to <strong>view</strong>
              </div>
            }
          >
            <div
              style={{
                display: 'inline-block',
                padding: '0 10px'
              }}
            >
              <Button
                variant="info"
                onClick={this.props.onView}
                disabled={this.props.disableView}
                style={this.props.disableView ? { pointerEvents: 'none' } : {}}
              >
                View Team
              </Button>
            </div>
          </Tooltip>
          <Tooltip
            trigger={
              this.props.disableUpdate ? ['hover', 'focus', 'click'] : []
            }
            placement="top"
            overlay={
              <div>
                Select a team to <strong>update</strong>
              </div>
            }
          >
            <div
              style={{
                display: 'inline-block',
                padding: '0 10px 0 0'
              }}
            >
              <Button
                variant="info"
                onClick={this.props.onUpdate}
                disabled={this.props.disableUpdate}
                style={
                  this.props.disableUpdate ? { pointerEvents: 'none' } : {}
                }
              >
                Update Team
              </Button>
            </div>
          </Tooltip>
          <Tooltip
            trigger={
              this.props.disableDelete ? ['hover', 'focus', 'click'] : []
            }
            placement="top"
            overlay={
              <div>
                Select a team to <strong>delete</strong>
              </div>
            }
          >
            <div style={{ display: 'inline-block' }}>
              <Button
                variant="danger"
                onClick={this.props.onDelete}
                disabled={this.props.disableDelete}
                style={
                  this.props.disableDelete ? { pointerEvents: 'none' } : {}
                }
              >
                Delete Team
              </Button>
            </div>
          </Tooltip>
        </ButtonToolbar>
      </Box>
    )
  }
}

export default Toolbar
