import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class RemotePaging extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        description: PropTypes.string,
        usersCount: PropTypes.number
      }).isRequired
    ).isRequired,
    onPageChange: PropTypes.func.isRequired,
    onSizePerPageList: PropTypes.func.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    dataTotalSize: PropTypes.number.isRequired,
    sizePerPageList: PropTypes.arrayOf(PropTypes.number).isRequired,
    expandRows: PropTypes.bool
  }

  render() {
    const {
      data,
      udaruUrl,
      authorization,
      org,
      dataTotalSize,
      sizePerPage,
      onPageChange,
      sizePerPageList,
      currentPage,
      onSizePerPageList,
      onSelect,
      searchDelayTime,
      onSearchChange,
      expandRows,
      ExpandComponent,
      expandComponentOnClick
    } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <BootstrapTable
              data={data}
              remote
              striped
              search
              pagination
              fetchInfo={{ dataTotalSize }}
              selectRow={{
                mode: 'radio',
                clickToSelect: false,
                clickToExpand: true,
                onSelect
              }}
              expandColumnOptions={{
                expandColumnVisible: expandRows,
                expandColumnComponent({ isExpandableRow, isExpanded }) {
                  return isExpandableRow ? (
                    isExpanded ? (
                      <div>
                        <Glyphicon glyph="remove" />
                      </div>
                    ) : (
                      <div>
                        <Glyphicon
                          glyph="signal"
                          style={{ transform: 'scale(1, -1) rotate(90deg)' }}
                        />
                      </div>
                    )
                  ) : (
                    <div>' '</div>
                  )
                }
              }}
              expandableRow={row => expandRows}
              expandComponent={row => (
                <ExpandComponent
                  udaruUrl={udaruUrl}
                  authorization={authorization}
                  org={org}
                  parentTeamId={row.id}
                  parentName={row.name}
                  expandComponentOnClick={expandComponentOnClick}
                />
              )}
              options={{
                sizePerPage,
                onPageChange,
                sizePerPageList,
                page: currentPage,
                onSizePerPageList,
                noDataText: 'No Teams Found.',
                searchDelayTime,
                onSearchChange,
                expandRowBgColor: 'rgb(221, 221, 221)'
              }}
            >
              <TableHeaderColumn
                dataField="id"
                isKey
                dataAlign="center"
                width="70"
              >
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="description">
                Description
              </TableHeaderColumn>
              <TableHeaderColumn dataField="usersCount" dataAlign="center">
                Users Count
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default RemotePaging
