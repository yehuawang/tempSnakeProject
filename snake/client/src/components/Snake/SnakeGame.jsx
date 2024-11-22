import React, { useState, useEffect, useRef } from 'react'

function SnakeGame({ loggedInUser }) {




    return (
        <div>
            <p>Playing as: <span>{ loggedInUser.name }</span></p>
            <p>Coins to earn: <span>**retrieve coin function**</span></p>
        </div>
    )
}

export default SnakeGame