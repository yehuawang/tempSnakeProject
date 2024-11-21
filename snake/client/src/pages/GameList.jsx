import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/GameList.css'

function GameList({ gameListObject, category }) {

    const list = gameListObject.map(game => 
        <li className="game-list-item" key={game.id}>
            <Link className="game-list-selection-item" to={"/" + game.body}>{game.name}</Link>
        </li>
    )
    return (
        <div className="game-list-container">
            <h1 className="game-list-title">{category}</h1>
            <ul className="game-list-ul">
                {list}
            </ul>
        </div>
    )
}

export default GameList