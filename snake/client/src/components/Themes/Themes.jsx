import React from 'react';
import "../../styles/GameList.css";

const themes = ["default", "tiramisu"];

function Themes({ loggedInUser }) {
    const handleThemeChange = (theme) => {
        // Remove all theme classes from the body
        themes.forEach(t => document.body.classList.remove(t));
        // Add the selected theme class to the body
        document.body.classList.add(theme);
    };

    const list = themes.map(theme => 
        <li className="game-list-item" key={theme}>
            <div 
                className="game-list-selection-item"
                onClick={() => handleThemeChange(theme)} // Use an arrow function
            >
                {theme}
            </div>
        </li>
    );

    return (
        <div className="game-list-container">
            <h1 className="game-list-title">Themes</h1>
            <ul className="game-list-ul">
                {list}
            </ul>
        </div>
    );
}

export default Themes;
