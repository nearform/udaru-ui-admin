import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class TeamUsers extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
      }).isRequired
    ).isRequired,
    onPageChange: PropTypes.func.isRequired,
    onSizePerPageList: PropTypes.func.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    dataTotalSize: PropTypes.number.isRequired,
    sizePerPageList: PropTypes.arrayOf(PropTypes.number).isRequired
  }

  render() {
    const {
      data,
      dataTotalSize,
      sizePerPage,
      onPageChange,
      sizePerPageList,
      currentPage,
      onSizePerPageList
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
              fetchInfo={{ dataTotalSize }}
              options={{
                sizePerPage,
                onPageChange,
                sizePerPageList,
                page: currentPage,
                onSizePerPageList,
                noDataText: 'No Users in Team.'
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

export default TeamUsers
