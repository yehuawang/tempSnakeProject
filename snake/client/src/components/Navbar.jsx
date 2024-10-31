import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (

    <nav className="navbar">
        <div className="logo-div">
            <Link className="snake-logo" to="/">SNAKE!</Link>
        </div>
        <div className="navbar-item-list">
            <Link className="nav-item" to="/reaction-game">Reaction</Link>
            <Link className="nav-item" to="/memory-game">Memory</Link>
            <Link className="nav-item" to="/about">About Us</Link>
            <Link className="nav-item" to="/login">Log in</Link>
        </div>
    </nav>
    
  )
}

export default Navbar