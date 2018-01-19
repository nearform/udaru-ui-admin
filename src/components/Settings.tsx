import * as React from 'react'
import * as validUrl from 'valid-url'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getUserData, setUserData } from '../user-data'
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock,
  Alert,
  PageHeader
} from 'react-bootstrap'

type State = {
  url: string | null
  dirtyUrlInput: boolean
  rootUser: string | null
  dirtyRootUserInput: boolean
  showSuccessAlert: boolean
  showErrorAlert: boolean
  isSaving: boolean
}

type ValidateInput = 'success' | 'error' | null

class Settings extends React.Component<RouteComponentProps<{}>, State> {
  state: State = {
    url: null,
    dirtyUrlInput: false,
    rootUser: null,
    dirtyRootUserInput: false,
    showSuccessAlert: false,
    showErrorAlert: false,
    isSaving: false
  }

  async componentDidMount(): Promise<void> {
    const settings = await getUserData()
    const { state = {} } = this.props.location
    const { showErrorValidation = false } = state

    this.setState({
      url: settings.url,
      rootUser: settings.rootUser,
      dirtyUrlInput: showErrorValidation,
      dirtyRootUserInput: showErrorValidation
    })
  }

  isValidForm(): boolean {
    return (
      this.validateUrl() === 'success' && this.validateRootUser() === 'success'
    )
  }

  componentDidUpdate(): void {
    if (this.state.showSuccessAlert) {
      // If success alert is displayed, hide after 5 seconds
      setTimeout(this.setState.bind(this, { showSuccessAlert: false }), 5000)
    }
    if (this.state.showErrorAlert) {
      // If error alert is displayed, hide after 5 seconds
      setTimeout(this.setState.bind(this, { showErrorAlert: false }), 5000)
    }
  }

  showMessage(result: boolean): void {
    this.setState({ isSaving: false })

    result
      ? this.setState({ showSuccessAlert: true })
      : this.setState({ showErrorAlert: true })
  }

  onSubmit = async (e: React.FormEvent<Form>): Promise<void> => {
    e.preventDefault()

    if (this.isValidForm()) {
      await this.setState({ isSaving: true })
      const result = await setUserData({
        url: this.state.url,
        rootUser: this.state.rootUser
      })

      setTimeout(this.showMessage.bind(this, result), 500)
    } else {
      await this.setState({
        dirtyUrlInput: true,
        dirtyRootUserInput: true
      })
    }
  }

  handleUrlChange = (e: React.FormEvent<EventTarget>): void => {
    this.setState({
      url: (e.target as HTMLInputElement).value
    })
  }

  validateUrl(): ValidateInput {
    const { url } = this.state

    const isValidUrl = Boolean(validUrl.isWebUri(url))

    if (url && isValidUrl) {
      return 'success'
    }

    if (!this.state.dirtyUrlInput) return null

    return 'error'
  }

  handleRootUserChange = (e: React.FormEvent<EventTarget>): void => {
    this.setState({
      rootUser: (e.target as HTMLInputElement).value
    })
  }

  validateRootUser(): ValidateInput {
    const { rootUser } = this.state

    if (rootUser && rootUser.length > 0) {
      return 'success'
    }

    if (!this.state.dirtyRootUserInput) return null

    return 'error'
  }

  render() {
    const {
      dirtyUrlInput,
      dirtyRootUserInput,
      showSuccessAlert,
      showErrorAlert,
      isSaving
    } = this.state
    const url = this.state.url || ''
    const rootUser = this.state.rootUser || ''

    return (
      <Row>
        <Row>
          <Col xs={12}>
            <PageHeader>Settings</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showSuccessAlert && (
              <Alert bsStyle="success">
                The settings have been <strong>successfully</strong> saved.
              </Alert>
            )}
            {showErrorAlert && (
              <Alert bsStyle="danger">
                There was an <strong>error</strong> saving those settings.
                Please try again.
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form horizontal onSubmit={this.onSubmit}>
              <FormGroup validationState={this.validateUrl()}>
                <Col componentClass={ControlLabel} xs={3}>
                  Udaru URL:
                </Col>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={url}
                    placeholder="Udaru URL"
                    onBlur={() => this.setState({ dirtyUrlInput: true })}
                    onChange={this.handleUrlChange}
                  />
                  <FormControl.Feedback />
                  {dirtyUrlInput &&
                    this.validateUrl() !== 'success' && (
                      <HelpBlock>
                        Enter the root URL of the Udaru instance.
                      </HelpBlock>
                    )}
                </Col>
              </FormGroup>

              <FormGroup validationState={this.validateRootUser()}>
                <Col componentClass={ControlLabel} xs={3}>
                  Udaru Root User:
                </Col>
                <Col xs={6}>
                  <FormControl
                    type="text"
                    value={rootUser}
                    placeholder="Root User"
                    onBlur={() => this.setState({ dirtyRootUserInput: true })}
                    onChange={this.handleRootUserChange}
                  />
                  <FormControl.Feedback />
                  {dirtyRootUserInput &&
                    this.validateRootUser() !== 'success' && (
                      <HelpBlock>
                        Enter the User ID of the enpoint caller to be set in the
                        authorization header.
                      </HelpBlock>
                    )}
                </Col>
              </FormGroup>

              <FormGroup>
                <Col xsOffset={8}>
                  <Button bsStyle="primary" type="submit" disabled={isSaving}>
                    Save
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default withRouter(Settings)
