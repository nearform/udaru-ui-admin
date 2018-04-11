import React from 'react'
import renderer from 'react-test-renderer'
import RemotePaging from 'remote-paging'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import theme from '../lib/components/theme'

expect.addSnapshotSerializer(createSerializer(emotion))

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
    udaruUrl: '',
    authorization: '',
    org: '',
    dataTotalSize: 100,
    sizePerPage: 5,
    onPageChange: () => {},
    sizePerPageList: [5, 10, 25, 50, 100],
    currentPage: 1,
    onSizePerPageList: () => {},
    onSelect: () => {},
    searchDelayTime: 300,
    onSearchChange: () => {},
    expandRows: true,
    ExpandComponent: () => <div />,
    expandComponentOnClick: () => {}
  }

  const component = renderer.create(<RemotePaging theme={theme} {...props} />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

it('should always set true to expandable row', () => {
  const component = renderer.create(<RemotePaging theme={theme} />)
  const instance = component.root.instance

  expect(instance.expandableRow()).toBeTruthy()
})

it('should always return ExpandComponent', () => {
  const result = {
    udaruUrl: 'my-udaru-url',
    authorization: 'my-authorization',
    org: 'my-org',
    parentTeamId: 'parent-id',
    parentName: 'parent-name',
    expandComponentOnClick: jest.fn()
  }

  const row = {
    row: {
      id: 1,
      name: 'Team 1'
    }
  }

  const component = renderer.create(
    <RemotePaging
      theme={theme}
      ExpandComponent={() => <div />}
      udaruUrl={result.udaruUrl}
      authorization={result.authorization}
      org={result.org}
      parentTeamId={result.parentTeamId}
      parentName={result.parentName}
      expandComponentOnClick={result.expandComponentOnClick}
    />
  )
  const instance = component.root.instance
  const expandComponentInstance = instance.expandComponent(row)

  const { props } = expandComponentInstance
  const {
    udaruUrl,
    authorization,
    org,
    parentTeamId,
    parentName,
    expandComponentOnClick
  } = props

  expect(udaruUrl).toBe(result.udaruUrl)
  expect(authorization).toBe(result.authorization)
  expect(org).toBe(result.org)
  expect(parentTeamId).toBe(row.row.id)
  expect(parentName).toBe(row.row.name)
  expect(expandComponentOnClick).toBe(result.expandComponentOnClick)
})

it('should open and close row', () => {
  const component = renderer.create(<RemotePaging theme={theme} />)
  const instance = component.root.instance

  const expand = instance.expandColumnComponent({
    isExpandableRow: true,
    isExpanded: true
  })

  const expandedComponent = renderer.create(expand)
  expect(expandedComponent.toJSON()).toMatchSnapshot()

  const collapse = instance.expandColumnComponent({
    isExpandableRow: true,
    isExpanded: false
  })
  const collapedComponent = renderer.create(collapse)
  expect(collapedComponent.toJSON()).toMatchSnapshot()

  const empty = instance.expandColumnComponent({
    isExpandableRow: false
  })
  const emptyComponent = renderer.create(empty)
  expect(emptyComponent.toJSON()).toMatchSnapshot()
})
