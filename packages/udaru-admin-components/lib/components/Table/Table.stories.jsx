import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import { Table } from './'

const data = [
  {
    'id': '1',
    'name': 'Admins',
    'description': 'Administrators of the Authorization System',
    'path': '1',
    'organizationId': 'WONKA',
    'usersCount': 1
  }, {
    'id': '3',
    'name': 'Authors',
    'description': 'Content contributors',
    'path': '3',
    'organizationId': 'WONKA',
    'usersCount': 1
  }, {
    'id': '6',
    'name': 'Company Lawyer',
    'description': 'Author of legal documents',
    'path': '6',
    'organizationId': 'WONKA',
    'usersCount': 0
  }, {
    'id': '4',
    'name': 'Managers',
    'description': 'General Line Managers with confidential info',
    'path': '4',
    'organizationId': 'WONKA',
    'usersCount': 1
  }, {
    'id': '5',
    'name': 'Personnel Managers',
    'description': 'Personnel Line Managers with confidential info',
    'path': '5',
    'organizationId': 'WONKA',
    'usersCount': 1
  }
]

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

const columns2 = [
  {
    id: "checkbox",
    accessor: "",
    Cell: ({ original }) => {
      return (
        <input
          type="checkbox"
          className="checkbox"
          checked={null}
          onChange={action('checkbox selected')}
        />
      );
    },
    Header: x => {
      return (<div></div>)
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

storiesOf('Components/Table', module)
  .add(
    'Table component',
    withInfo({
      inline: true,
      text: `A wrapped version of "react-table" with custom styling`
    })(() => <Table
              m={4}
              data={data}
              columns={columns}
              defaultPageSize={5}
            ></Table>)
  )
  .add('Checkbox Table', () => (
    <Table
      m={4}
      data={data}
      columns={columns2}
      defaultPageSize={5}
    ></Table>
  ))