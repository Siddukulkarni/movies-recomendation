import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Movies World</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarTogglerDemo02" />
        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/reviews">
              <FontAwesomeIcon icon={faStar} /> Reviews
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              <FontAwesomeIcon icon={faHeart} /> Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;