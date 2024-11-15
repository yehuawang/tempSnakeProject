import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moonIcon from '/moon.svg';
import sunIcon from '/sun.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AskMe from './AskMe';

import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

function Navbar({ loggedInUser }) {
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();

    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        setDarkMode(!darkMode);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <BootstrapNavbar expand="md" className="navbar">
                <Container>
                    <BootstrapNavbar.Brand className="navbar-logo-fixed">
                        <Link className="snake-logo" to="/">SNAKE!</Link>
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="navbarSupportedContent">
                        <i className="bi bi-list"></i>
                    </BootstrapNavbar.Toggle>
                    <BootstrapNavbar.Collapse id="navbarSupportedContent" className="navbar-item-list-container">
                        <Nav className="mb-2 navbar-item-list">
                            <Nav.Link as={Link} to="/reaction-games" className={`nav-link ${isActive('/reaction-games') ? 'active' : ''}`}>Reaction</Nav.Link>
                            <Nav.Link as={Link} to="/memory-games" className={`nav-link ${isActive('/memory-games') ? 'active' : ''}`}>Memory</Nav.Link>
                            <Nav.Link as={Link} to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Nav.Link>
                            {loggedInUser.email === 'guest' ? (
                                <Nav.Link as={Link} to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>Log in</Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Nav.Link>
                            )}
                        </Nav>
                    </BootstrapNavbar.Collapse>
                    <div className="navbar-darkmode-container">
                        <img src={!darkMode ? moonIcon : sunIcon} alt="Dark Mode" className="dark-mode-icon" />
                        <button 
                            onClick={toggleTheme} 
                            className={`theme-toggle-button ${darkMode ? 'dark-mode' : ''}`}
                        ></button>
                    </div>
                </Container>
            </BootstrapNavbar>
            <AskMe />
        </>
    );
}

export default Navbar;