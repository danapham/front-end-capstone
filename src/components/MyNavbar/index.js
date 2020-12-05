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
  NavbarText,
} from 'reactstrap';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
          <NavbarText>Google Pic</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
