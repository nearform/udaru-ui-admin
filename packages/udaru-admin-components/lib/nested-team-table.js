import React from 'react'
import { Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class NestedTeamTable extends React.Component {
  render() {
    const {
      data,
      dataTotalSize,
      sizePerPage,
      onPageChange,
      sizePerPageList,
      currentPage,
      onSizePerPageList,
      parentName,
      parentTeamId,
      expandComponentOnClick
    } = this.props

    return (
      <div style={{ background: '#fff', padding: '60px 20px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Nested Teams for {parentName}</h2>
        </div>
        <BootstrapTable
          data={data}
          remote
          striped
          condensed
          bordered={false}
          fetchInfo={{ dataTotalSize }}
          options={{
            sizePerPage,
            onPageChange,
            sizePerPageList,
            page: currentPage,
            onSizePerPageList,
            noDataText: 'No Nested Teams Found.'
          }}
        >
          <TableHeaderColumn
            dataField="view"
            dataAlign="center"
            width="70"
            dataFormat={(cell, row) => {
              return (
                <Button
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                  bsStyle="link"
                  onClick={() => {
                    expandComponentOnClick(parentTeamId, row.id)
                  }}
                >
                  View
                </Button>
              )
            }}
          />
          <TableHeaderColumn dataField="id" isKey dataAlign="center" width="70">
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
      </div>
    )
  }
}

export default NestedTeamTable
