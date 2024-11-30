import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moonIcon from '/moon.svg';
import sunIcon from '/sun.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AskMe from './AskMe';
import DefaultProfileImage from '/default-snake-profile-image.png';

import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

function Navbar({ loggedInUser }) {
    const [profileImg, setProfileImg] = useState(DefaultProfileImage);
    const [darkMode, setDarkMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Audio state
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

    useEffect(() => {

        const fetchProfileImage = async () => { 
            console.log("fetching profile image string from db...");
            try {
                const response = await fetch('http://localhost:5001/api/users/get-profile-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: loggedInUser.email }),
                });
    
                if (response.status === 404) {
                    console.log("User has no profile image set yet, default profile img is used");
                    return;
                }
    
                const data = await response.json();
                const profileImageString = data.profileImage;
                console.log(`profile image string fetched: ${profileImageString}`);
                const imageUrl = `http://localhost:5001/uploads/${profileImageString}`;
                setProfileImg(imageUrl);
                console.log(`profileImageURL set to: ${imageUrl}`);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        if (loggedInUser.name !== 'guest') {
            fetchProfileImage();
        }
    })

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <BootstrapNavbar expand="lg" className="navbar">
                <Container className="navbar-container">
                    <BootstrapNavbar.Brand className="navbar-logo-fixed">
                        <Link className="snake-logo" to="/">SNAKE!</Link>
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="navbarSupportedContent">
                        <i className="bi bi-list"></i>
                    </BootstrapNavbar.Toggle>
                    <BootstrapNavbar.Collapse id="navbarSupportedContent" className="navbar-item-list-container">
                        <Nav className="mb-2 navbar-item-list mx-auto">
                            <Nav.Link as={Link} to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>About Us</Nav.Link>
                            <Nav.Link as={Link} to="/reaction-games" className={`nav-link ${isActive('/reaction-games') ? 'active' : ''}`}>Reaction</Nav.Link>
                            <Nav.Link as={Link} to="/memory-games" className={`nav-link ${isActive('/memory-games') ? 'active' : ''}`}>Memory</Nav.Link>
                            <Nav.Link as={Link} to="/themes" className={`nav-link ${isActive('/themes') ? 'active' : ''}`}>Themes</Nav.Link>
                        </Nav>
                    </BootstrapNavbar.Collapse>
                    {/* <div className="navbar-controls-container"> */}
                        {/* Dark Mode Toggle */}
                        {/* <div className="navbar-darkmode-container">
                            <i className={`bi bi-${darkMode?"moon":"sun"}-fill`}></i>
                            <button 
                                onClick={toggleTheme} 
                                className={`theme-toggle-button ${darkMode ? 'dark-mode' : ''}`}
                            ></button>
                        </div> */}
                        {/* Audio Toggle */}
                        {/* <button 
                            onClick={toggleAudio} 
                            className="audio-toggle-button"
                            title={isPlaying ? "Pause Music" : "Play Music"}
                        >
                            {isPlaying ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
                        </button>
                    </div> */}
                    <div className="user-nav-info-container">
                    {
                        loggedInUser.email === 'guest' ? (
                            <Link as={Link} to="/login" className={`username-dashboard-link ${isActive('/login') ? 'active' : ''}`}>Log in</Link>
                        ) : (
                            <>
                                <div className="user-navbar-img-container">
                                    <img src={profileImg} alt="User profile" />
                                    <Link as={Link} alt="Dashboard" to="/dashboard" className={`username-dashboard-link ${isActive('/dashboard') ? 'active' : ''}`} title="Go to Dashboard">{loggedInUser.name}</Link>
                                </div>
                            </>
                        )
                    }
                    </div>
                </Container>
            </BootstrapNavbar>
            <AskMe loggedInUser={loggedInUser} />
        </>
    );
}

export default Navbar;
