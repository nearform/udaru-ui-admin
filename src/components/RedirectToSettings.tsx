import * as React from 'react'
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom'

class RedirectToSettings extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <Redirect
        to={{
          pathname: '/settings',
          state: { showErrorValidation: true }
        }}
      />
    )
  }
}

export default withRouter(RedirectToSettings)
