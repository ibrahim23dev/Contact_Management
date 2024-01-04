import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const AppNavBar = () => {
    return (
        <div>
            <Navbar  bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><img className="nav-logo" src='' /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><NavLink to="/">Contact List</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/create">Add Contact</NavLink></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default AppNavBar;