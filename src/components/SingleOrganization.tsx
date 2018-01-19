import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as React from 'react'
import axios from 'axios'
import { css } from 'glamor'
import { Row, Col, PageHeader, Button, Alert, Panel } from 'react-bootstrap'

import { ComponentUnmountedMsg, fetchSingleOrganization } from '../network'
import RedirectToSettings from './RedirectToSettings'

export interface Policy {
  id: string
  name: string
  version: 1
}

export interface Organization {
  id: string
  name: string
  policies: Policy[]
  description: string
}

export interface Props {
  organizationId: string
}

export interface State {
  loading: boolean
  redirect: boolean
  error: Error | null
  organization: Organization | null
}

class SingleOrganization extends React.Component<Props, State> {
  source = axios.CancelToken.source()

  state: State = {
    loading: false,
    redirect: false,
    error: null,
    organization: null
  }

  setStateAsync<T>(state: T): Promise<void> {
    return new Promise(resolve => this.setState(state, resolve))
  }

  componentDidMount(): void {
    this.fetch()
  }

  componentWillUnmount(): void {
    this.source.cancel(ComponentUnmountedMsg.RequestCancelled)
  }

  async fetch(): Promise<void> {
    await this.setStateAsync<{ loading: boolean; error: null }>({
      loading: true,
      error: null
    })
    const {
      error = null,
      redirect = false,
      data = null
    } = await fetchSingleOrganization<Organization>(
      this.source,
      this.props.organizationId
    )

    if (error && error.message === ComponentUnmountedMsg.RequestCancelled) {
      return
    }

    await this.setStateAsync<State>({
      loading: false,
      error,
      redirect,
      organization: data
    })
  }

  render() {
    const { organization, loading, error, redirect } = this.state

    if (redirect) return <RedirectToSettings />

    return (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>
              Organization Information{' '}
              <small>{this.props.organizationId}</small>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p>
              This page provides you with the details of a single organization.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                {error && (
                  <Alert bsStyle="danger">
                    There was an <strong>error</strong> fetching organizations.
                    Please try again.
                  </Alert>
                )}
              </Col>
              <Col xs={12}>
                <Button onClick={() => this.fetch()} disabled={loading}>
                  Refresh
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row {...css({ marginTop: '30px' })}>
          {loading ? (
            <Col xsOffset={2} xs={2}>
              <h1>Loading...</h1>
            </Col>
          ) : organization ? (
            <Col xs={12}>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    {organization.name}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body
                  {...css({
                    ' strong': {
                      display: 'block',
                      float: 'left',
                      width: '150px'
                    }
                  })}
                >
                  <p>
                    <strong>ID:</strong>
                    <span>{organization.id}</span>
                  </p>
                  <p>
                    <strong>Name:</strong>
                    <span>{organization.name}</span>
                  </p>
                  <p>
                    <strong>Description:</strong>
                    <span>{organization.description}</span>
                  </p>
                </Panel.Body>
              </Panel>
            </Col>
          ) : null}
        </Row>
      </Row>
    )
  }
}

export default SingleOrganization
