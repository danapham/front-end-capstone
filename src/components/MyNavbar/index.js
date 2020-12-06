import firebase from 'firebase';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logOut = (e) => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">gredients</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/recipes">Recipes</NavLink>
            </NavItem>
            </Nav>
            <Nav>
          <UncontrolledDropdown nav inNavbar className="ml-auto">
              <DropdownToggle nav>
                <img src={props.user.photoURL} alt="user pic" className="profile-pic" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={logOut}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
