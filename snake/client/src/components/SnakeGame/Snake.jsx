import SnakeGameState from './SnakeGameState'
import React, { useState, useEffect } from 'react'

function Snake({ loggedInUser }) {
    const player = loggedInUser.name
    
    return(
        <>
            <p>Playing as: <b>{player}</b></p>
            <SnakeGameState loggedInUser={loggedInUser} />
        </>
    )
}

export default Snake