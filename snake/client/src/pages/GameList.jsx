import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/GameList.css'

function GameList({ gameListObject }) {
    const type = gameListObject.listType
    const list = gameListObject.listOfGames.map(game => 
        <li className="game-list-item" key={game.id}>
            <Link className="game-list-selection-item" to={"/" + game.name}>{game.name}</Link>
        </li>
    )
    return (
        <div className="game-list-container">
            <h1 className="game-list-title">{type}</h1>
            <ul className="game-list-ul">
                {list}
            </ul>
        </div>
    )
}

export default GameList