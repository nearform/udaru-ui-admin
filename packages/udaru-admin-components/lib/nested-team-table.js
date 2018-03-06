import React from 'react'
import { Button, Table } from './components'

class NestedTeamTable extends React.Component {
  onClick = this.onClick.bind(this)
  onClick({ id }) {
    this.props.expandComponentOnClick(this.props.parentTeamId, id)
  }

  dataFormat = this.dataFormat.bind(this)
  dataFormat(cell, row) {
    return (
      <Button
        style={{
          paddingTop: 0,
          paddingBottom: 0
        }}
        variant="link"
        onClick={() => this.onClick(row)}
      >
        View
      </Button>
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
      parentName
    } = this.props

    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Users Count',
        accessor: 'usersCount'
      }
    ]

    return (
      <div style={{ background: '#fff', padding: '60px 20px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Nested Teams for {parentName}</h2>
        </div>
        <Table
          columns={columns}
          data={data}
          defaultPageSize={sizePerPage}
          minRows={1}
          noDataText="No Nested Teams Found."
          onPageChange={onPageChange}
          onPageSizeChange={onSizePerPageList}
          page={0}
        />
      </div>
    )
  }
}

export default NestedTeamTable
