import React, { useState, useEffect, useRef } from 'react'
import SnakeBoard from './SnakeBoard'
import '../../styles/Snake.css'

function SnakeGame({ loggedInUser, setRefreshAttempts}) {



    return (
        <div className="snake-container">
            <p>Playing as: <span>{ loggedInUser.name }</span></p>
            
            <SnakeBoard 
                userEmail = {loggedInUser.email}
                setRefreshAttempts = {setRefreshAttempts}
            />
                
        </div>
    )
}

export default SnakeGame