import React from 'react'
import './GamePage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GameBoard from '../components/GameBoard'
import GameHeader from '../components/GameHeader'
import GameCanvas from '../components/GameCanvas'

function GamePage() {
    return (
        <div className="game-container container-xlg text-center">
            <GameHeader gameName="Snake Game" />
            <GameBoard>
                <GameCanvas game="snake" />
            </GameBoard>
        </div>
    )
}

export default GamePage