import React from 'react'
import { Box, PageHeader, Panel, Text } from './components'

class Team extends React.Component {
  render() {
    const { name, description, organizationId, usersCount } = this.props

    return (
      <Box m={4}>
        <PageHeader>
          View Team <small>{name}</small>
        </PageHeader>
        <Panel title="Details">
          <div>
            <Text.p>
              <Text.span bold>Name: </Text.span>
              <Text.span>{name}</Text.span>
            </Text.p>
            <Text.p>
              <Text.span bold>Organization ID: </Text.span>
              <Text.span>{organizationId}</Text.span>
            </Text.p>
            <Text.p>
              <Text.span bold>Number of Users: </Text.span>
              <Text.span>{usersCount}</Text.span>
            </Text.p>
            <Text.p>
              <Text.span bold>Description: </Text.span>
              <Text.span>{description}</Text.span>
            </Text.p>
          </div>
        </Panel>
      </Box>
    )
  }
}

export default Team
