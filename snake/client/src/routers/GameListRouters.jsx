import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GamePage from '../pages/GamePage'
import { reactionGameList, memoryGameList } from '../data/tempGameListDatabase.js'

function GameListRouters({ loggedInUser }) {
    console.log(`passing ${loggedInUser} to GamePages`)
    const reactionRouters = reactionGameList.listOfGames.map(game =>
        <Route 
            key={game.id}
            path={"/" + game.gamebody}
            element={<GamePage game={game} loggedInUser={loggedInUser} />}
        />
    )
    const memoryRouters = memoryGameList.listOfGames.map(game =>
        <Route 
            key={game.id}
            path={"/" + game.gamebody} 
            element={<GamePage game={game} loggedInUser={loggedInUser} />}
        />
    )
    
    return (
        <Routes>
            {reactionRouters}
            {memoryRouters}
        </Routes>
    )
}

export default GameListRouters