import React from 'react'
import renderer from 'react-test-renderer'
import NestedTeamTable from 'nested-team-table'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import theme from '../lib/components/theme'

expect.addSnapshotSerializer(createSerializer(emotion))

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
    SubComponent: () => {}
  }

  const component = renderer.create(
    <NestedTeamTable theme={theme} {...props} />
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
