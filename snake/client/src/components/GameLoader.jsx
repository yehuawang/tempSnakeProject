import React from 'react'
import Snake from './SnakeGame/Snake'
import ImageMemory from './ImageMemory/ImageMemory'
import '../styles/Gameboard.css'

function GameLoader({ gamebody, loggedInUser}) {
    console.log(loggedInUser)
    if (gamebody === "snake") {
        return (
            <div>
                {console.log(`passing ${loggedInUser} to Snake`)}
                <Snake loggedInUser={loggedInUser} />
            </div>
        )
    } else if (gamebody === "image-memory") {
        return (
            <div>
                <ImageMemory loggedInUser={loggedInUser} />
            </div>
        )
    } else {
        return (
            <div>
                <h1>Game coming soon!</h1>
            </div>
        )
    }
}

export default GameLoader