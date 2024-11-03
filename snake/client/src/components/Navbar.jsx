import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import MountAllRouters from '../routers/MountAllRouters';

function Navbar({ loggedInUser}) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        setDarkMode(!darkMode);
    };

  return (
      <nav className="navbar">
            <div className="logo-div">
                <Link className="snake-logo" to="/">SNAKE!</Link>
            </div>
            <div className="navbar-item-list">
                <Link className="nav-item" to="/reaction-games">Reaction</Link>
                <Link className="nav-item" to="/memory-games">Memory</Link>
                <Link className="nav-item" to="/about">About Us</Link>
                {
                    loggedInUser.email === 'guest' ? (
                        <Link className="nav-item" to="/login">Log in</Link>
                    ) : (
                        <Link className="nav-item" to="/dashboard">Dashboard</Link>
                    )
                }
                <Link className="nav-item" to="/chatbox">ChatBot</Link>
            </div>
            <button onClick={toggleTheme} className="theme-toggle-button">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
      </nav>
  );
}

export default Navbar