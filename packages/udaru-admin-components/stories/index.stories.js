import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  TeamsTable,
  CreateTeam,
  DeleteTeam,
  UpdateTeam,
  TeamsPoliciesMapper,
  Toolbar,
  ViewTeam
} from '../dist/es'

const LoadingCmp = () => <h1>Custom Loading...</h1>
const ErrorCmp = () => <h1>Custom Error Message.</h1>

storiesOf('Teams Table', module)
  .add('default props', () => {
    return (
      <div style={{ margin: '50px', minHeight: '100px' }}>
        <TeamsTable
          udaruUrl="http://localhost:8080"
          authorization="ROOTid"
          org="WONKA"
        />
      </div>
    )
  })
  .add('custom table paging', () => {
    return (
      <div style={{ margin: '50px', minHeight: '100px' }}>
        <TeamsTable
          udaruUrl="http://localhost:8080"
          authorization="ROOTid"
          org="WONKA"
          currentPage={2}
          sizePerPage={1}
          sizePerPageList={[1, 2, 3]}
          Loading={LoadingCmp}
        />
      </div>
    )
  })
  .add('empty data', () => {
    return (
      <div style={{ margin: '50px', minHeight: '100px' }}>
        <TeamsTable
          udaruUrl="http://localhost:8080"
          authorization="ROOTid"
          org="RANDOM_ORG"
        />
      </div>
    )
  })
  .add('error state', () => {
    return (
      <div style={{ margin: '50px', minHeight: '100px' }}>
        <TeamsTable udaruUrl="" />
      </div>
    )
  })
  .add('custom error state', () => {
    return (
      <div style={{ margin: '50px', minHeight: '100px' }}>
        <TeamsTable udaruUrl="" Error={ErrorCmp} />
      </div>
    )
  })

storiesOf('Create Team', module).add('create team', () => {
  return <CreateTeam udaruUrl="http://localhost:8080" authorization="ROOTid" />
})

storiesOf('Update Team', module).add('update team', () => {
  return (
    <UpdateTeam
      udaruUrl="http://localhost:8080"
      authorization="ROOTid"
      team={{
        id: 'Albert',
        name: 'Albert Team',
        description: 'Albert team description'
      }}
    />
  )
})

storiesOf('Delete Team', module).add('delete team', () => {
  return (
    <DeleteTeam
      udaruUrl="http://localhost:8080"
      authorization="ROOTid"
      id="AlbertTeam"
    />
  )
})

storiesOf('View Team', module).add('View team', () => {
  return (
    <ViewTeam
      udaruUrl="http://localhost:8080"
      authorization="ROOTid"
      org="WONKA"
      id="1"
    />
  )
})

storiesOf('Toolbar', module).add('toolbar', () => {
  return (
    <Toolbar
      onCreate={action('on create')}
      onUpdate={action('on update')}
      onDelete={action('on delete')}
    />
  )
})

storiesOf('TeamsPoliciesMapper', module).add('TeamsPoliciesMapper', () => {
  return (
    <TeamsPoliciesMapper
      udaruUrl="http://localhost:8080"
      authorization="ROOTid"
      org="WONKA"
      id="1"
      name="Admins"
    />
  )
})
