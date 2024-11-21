import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import GamePage from '../pages/GamePage'
// import { reactionGameList, memoryGameList } from '../data/tempGameListDatabase.js'

function GameListRouters({ loggedInUser }) {

    const [reactionGameList, setReactionGameList] = useState([])
    const [memoryGameList, setMemoryGameList] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const responseReaction = await fetch('http://localhost:5001/api/games/getGames', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameCategory: 'reaction' })
                })
                const dataReaction = await responseReaction.json()
                setReactionGameList(dataReaction)

                const responseMemory = await fetch('http://localhost:5001/api/games/getGames', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameCategory: 'memory' })
                })
                const dataMemory = await responseMemory.json()
                setMemoryGameList(dataMemory)

            } catch (error) {
                console.log(error)
            }
        }

        fetchGames()


    },[])


    console.log(`passing ${loggedInUser} to GamePages`)
    const reactionRouters = reactionGameList.map(game =>
        <Route 
            key={game.id}
            path={"/" + game.body}
            element={<GamePage game={game} loggedInUser={loggedInUser} />}
        />
    )
    const memoryRouters = memoryGameList.map(game =>
        <Route 
            key={game.id}
            path={"/" + game.body} 
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