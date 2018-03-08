import React from 'react'
import renderer from 'react-test-renderer'
import TeamUsersTable from 'team-users-table'

jest.mock('react-bootstrap-table', () => {
  return {
    BootstrapTable: props => {
      return (
        <table>
          {' // mocked table output'}
          {props.children}
        </table>
      )
    },
    TableHeaderColumn: props => {
      return (
        <tr>
          <th>{props.dataField + ' // mocked table header column'}</th>
        </tr>
      )
    }
  }
})

it('should render with props', () => {
  const props = {
    data: [],
    dataTotalSize: 100,
    sizePerPage: 5,
    onPageChange: () => {},
    sizePerPageList: [5, 10, 25, 50, 100],
    currentPage: 1,
    onSizePerPageList: () => {}
  }

  const component = renderer.create(<TeamUsersTable {...props} />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
