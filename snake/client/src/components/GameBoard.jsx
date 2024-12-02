import React, { useState, useEffect } from 'react'
import '../styles/GameBoard.css'
import GameLoader from './GameLoader'
import GameRankList from './Charts/GameRankList'
import PreviousAttemptsList from './Charts/PreviousAttemptsList'

function GameBoard({ game, loggedInUser }) {

    const [refreshLeadBoard, setRefreshLeadBoard] = useState(false)

    const [refreshAttempts, setRefreshAttempts] = useState(false)


    useEffect(() => {
        setRefreshLeadBoard(true)
        setRefreshAttempts(true)
    },[game, loggedInUser])

    return (
        <div className="game-board">
            <div className="game-description">
                <h1>Game Description</h1>
                <p>
                    {game.description}
                </p>
                <h1>Game Instruction</h1>
                <p>
                    {game.instruction}
                </p>
            </div>
            <div className="game-canvas">
                <GameLoader game={game} loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </div>
            <div className="game-description">
                <h1>Lead Board</h1>
                <GameRankList game={game} loggedInUser={loggedInUser} refreshLeadBoard={refreshLeadBoard} setRefreshLeadBoard={setRefreshLeadBoard} />
                <h1>Previous Attempts</h1>
                <PreviousAttemptsList game={game} loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </div>
        </div>
    )
}

export default GameBoard