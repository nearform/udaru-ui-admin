import * as React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect={true} staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Udaru Admin</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/organizations">
              <NavItem eventKey={1} href="#">
                Organizations
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/teams">
              <NavItem eventKey={2} href="#">
                Teams
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/users">
              <NavItem eventKey={3} href="#">
                Users
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/policies">
              <NavItem eventKey={4} href="#">
                Policies
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight={true}>
            <LinkContainer to="/settings">
              <NavItem eventKey={1}>Settings</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
