import React from 'react'
import '../styles/GamePage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GameBoard from '../components/GameBoard'
import GameHeader from '../components/GameHeader'
import GameLoader from '../components/GameLoader'

function GamePage({ game }) {
    return (
        <div className="game-container container-xlg text-center">
            <GameHeader gameName={game.name}/>
            <GameBoard gamebody={game.gamebody}>
                <GameLoader gamebody={game.gamebody} />
            </GameBoard>
        </div>
    )
}

export default GamePage