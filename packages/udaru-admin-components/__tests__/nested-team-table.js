import React from 'react'
import renderer from 'react-test-renderer'
import NestedTeamTable from 'nested-team-table'

jest.mock('react-bootstrap-table', () => {
  return {
    BootstrapTable: props => (
      <table>
        {' // mocked table output'}
        {props.children}
      </table>
    ),
    TableHeaderColumn: props => {
      return props.dataFormat ? (
        <tr>
          <th>
            {' // mocked table header column data format'}
            {props.dataFormat(null, { id: 2 })}
          </th>
        </tr>
      ) : (
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
    currentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50, 100],
    onPageChange: () => {},
    onSizePerPageList: () => {},
    parentName: 'ABC Team',
    parentTeamId: 1,
    expandComponentOnClick: () => {}
  }

  const component = renderer.create(<NestedTeamTable {...props} />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should handle onClick', () => {
  const expandComponentOnClick = jest.fn()
  const props = {
    data: [],
    dataTotalSize: 100,
    currentPage: 1,
    sizePerPage: 5,
    sizePerPageList: [5, 10, 25, 50, 100],
    onPageChange: () => {},
    onSizePerPageList: () => {},
    parentName: 'ABC Team',
    parentTeamId: 1,
    expandComponentOnClick: expandComponentOnClick
  }

  const component = renderer.create(<NestedTeamTable {...props} />)
  const testInstance = component.root

  testInstance.findByType('button').props.onClick()
  expect(expandComponentOnClick).toHaveBeenCalled()
  expect(expandComponentOnClick.mock.calls[0]).toEqual([1, 2])
})
