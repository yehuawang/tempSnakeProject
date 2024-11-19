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
    const [isPlaying, setIsPlaying] = useState(true); // Audio state
    const location = useLocation();

    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        setDarkMode(!darkMode);
    };

    const toggleAudio = () => {
        const audio = document.getElementById("background-audio"); // Get the audio element
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying); // Update play state
        }
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
                            <Nav.Link as={Link} to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>About Us</Nav.Link>
                            {loggedInUser.email === 'guest' ? (
                                <Nav.Link as={Link} to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>Log in</Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Nav.Link>
                            )}
                        </Nav>
                    </BootstrapNavbar.Collapse>
                    <div className="navbar-controls-container">
                        {/* Dark Mode Toggle */}
                        <div className="navbar-darkmode-container">
                            {/* <img src={!darkMode ? moonIcon : sunIcon} alt="Dark Mode" className="dark-mode-icon" /> */}
                            <i className={`bi bi-${darkMode?"moon":"sun"}-fill`}></i>
                            <button 
                                onClick={toggleTheme} 
                                className={`theme-toggle-button ${darkMode ? 'dark-mode' : ''}`}
                            ></button>
                        </div>
                        {/* Audio Toggle */}
                        <button 
                            onClick={toggleAudio} 
                            className="audio-toggle-button"
                            title={isPlaying ? "Pause Music" : "Play Music"}
                        >
                            {isPlaying ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
                        </button>
                    </div>
                </Container>
            </BootstrapNavbar>
            <AskMe loggedInUser={loggedInUser} />
        </>
    );
}

export default Navbar;
