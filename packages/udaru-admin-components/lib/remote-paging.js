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
      })
    ),
    onPageChange: PropTypes.func,
    onSizePerPageList: PropTypes.func,
    sizePerPage: PropTypes.number,
    currentPage: PropTypes.number,
    dataTotalSize: PropTypes.number,
    sizePerPageList: PropTypes.arrayOf(PropTypes.number),
    expandRows: PropTypes.bool
  }

  static defaultProps = {
    data: [],
    sizePerPage: 5,
    currentPage: 1,
    dataTotalSize: 0,
    sizePerPageList: [5, 10, 25, 50]
  }

  /* runs to determine if expand component should be displayed */
  /* always true */
  expandableRow = this.expandableRow.bind(this)
  expandableRow(row) {
    return true
  }

  expandComponent = this.expandComponent.bind(this)
  expandComponent(row) {
    const {
      ExpandComponent,
      expandComponentOnClick,
      udaruUrl,
      authorization,
      org
    } = this.props
    return (
      <ExpandComponent
        udaruUrl={udaruUrl}
        authorization={authorization}
        org={org}
        parentTeamId={row.id}
        parentName={row.name}
        expandComponentOnClick={expandComponentOnClick}
      />
    )
  }

  expandColumnComponent = this.expandColumnComponent.bind(this)
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

  render() {
    const {
      data,
      dataTotalSize,
      sizePerPage,
      onPageChange,
      sizePerPageList,
      currentPage,
      onSizePerPageList,
      onSelect,
      searchDelayTime,
      onSearchChange,
      expandRows
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
                expandColumnComponent: this.expandColumnComponent
              }}
              expandableRow={this.expandableRow}
              expandComponent={this.expandComponent}
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
