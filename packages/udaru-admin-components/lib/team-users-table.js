import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class TeamUsersTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
      })
    ),
    onPageChange: PropTypes.func,
    onSizePerPageList: PropTypes.func,
    sizePerPage: PropTypes.number,
    currentPage: PropTypes.number,
    dataTotalSize: PropTypes.number,
    sizePerPageList: PropTypes.arrayOf(PropTypes.number)
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
      searchDelayTime,
      onSearchChange
    } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h3>Users</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapTable
              data={data}
              remote
              striped
              pagination
              search
              fetchInfo={{ dataTotalSize }}
              options={{
                sizePerPage,
                onPageChange,
                sizePerPageList,
                page: currentPage,
                onSizePerPageList,
                noDataText: 'No Users in Team.',
                searchDelayTime,
                onSearchChange
              }}
            >
              <TableHeaderColumn dataField="id" isKey dataAlign="center">
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TeamUsersTable
