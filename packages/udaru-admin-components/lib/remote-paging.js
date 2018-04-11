import React from 'react'
import PropTypes from 'prop-types'
import { Box, Icon, Table } from './components'

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
        parentTeamId={row.row.id}
        parentName={row.row.name}
        expandComponentOnClick={expandComponentOnClick}
      />
    )
  }

  expandColumnComponent = this.expandColumnComponent.bind(this)
  expandColumnComponent({ isExpandableRow, isExpanded }) {
    return isExpandableRow ? (
      isExpanded ? (
        <div>
          <Icon name="close" size={16} />
        </div>
      ) : (
        <div>
          <Icon
            name="signal"
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
      expandRows,
      selectedRow
    } = this.props

    const columns = [
      {
        id: 'checkbox',
        accessor: '',
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedRow === original.id}
              onChange={() => {
                onSelect(original.id)
              }}
            />
          )
        },
        Header: x => {
          return <div />
        },
        sortable: false,
        width: 45
      },
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

    const thisExpandComponent = this.expandableRow ? this.expandComponent : null

    return (
      <Box m={4}>
        <Table
          columns={columns}
          data={data}
          defaultPageSize={sizePerPage}
          minRows={1}
          noDataText="No Teams Found."
          onPageChange={onPageChange}
          onPageSizeChange={onSizePerPageList}
          page={currentPage - 1}
          toggleSelection={onSelect}
          SubComponent={thisExpandComponent}
        />
      </Box>
    )
  }
}

export default RemotePaging
