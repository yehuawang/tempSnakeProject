import React, { useEffect, useState, useRef } from 'react'
import Snake from './Snake'
import Food from './Food'
import './Snake.css'


const BOX_SIZE = 20
const LEVEL = 1
const BOARD_SIZE = BOX_SIZE * 3 * LEVEL
const SNAKE_VELOCITY = BOX_SIZE

const generateFoodCoordinates = () => {
  return {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100)
  }
}





function SnakeBoard() {
    const [snakeState, setSnakeState] = useState({
        snakeParts: [
            { x: 50, y: 50 },
            { x: 50, y: 50 },
            { x: 50, y: 50 }
        ],
        direction: 'R',

    })




    return (
        <div>SnakeBoard</div>
    )
}

export default SnakeBoard