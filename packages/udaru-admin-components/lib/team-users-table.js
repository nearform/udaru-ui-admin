import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Table } from './components'

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

    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      }
    ]
    if (!data) return null
    // Currently not using sizePerPageList
    return (
      <Box m={4}>
        <Heading.h3>Users</Heading.h3>
        <Table
          columns={columns}
          data={data}
          defaultPageSize={sizePerPage}
          minRows={1}
          noDataText="No Users in Team."
          onPageChange={onPageChange}
          onPageSizeChange={onSizePerPageList}
          page={currentPage - 1}
        />
      </Box>
    )
  }
}

export default TeamUsersTable
