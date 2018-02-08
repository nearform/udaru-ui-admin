import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { TeamsTable } from 'admin-teams-table'

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
        <TeamsTable udaruUrl="http://localhost:8080" authorization="ROOTid" />
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
