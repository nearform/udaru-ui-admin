import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
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
      onSizePerPageList,
      onSelect,
      searchDelayTime,
      onSearchChange
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
                clickToSelect: true,
                onSelect
              }}
              options={{
                sizePerPage,
                onPageChange,
                sizePerPageList,
                page: currentPage,
                onSizePerPageList,
                noDataText: 'No Teams Found.',
                searchDelayTime,
                onSearchChange
              }}
            >
              <TableHeaderColumn dataField="id" isKey dataAlign="center">
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="description">
                Description
              </TableHeaderColumn>
              <TableHeaderColumn dataField="usersCount">
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
