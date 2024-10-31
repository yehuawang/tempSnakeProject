import { useState } from 'react'
import SnakeGameWindow from './SnakeGameWindow'

function SnakeGameState() {

    const [score, setScore] = useState(0)   
    const [highestScore, setHighestScore] = useState(parseInt(localStorage.getItem('highScore')) || 0)
    const [gameOver, setGameOver] = useState(false)
    const [collideWith, setCollideWith] = useState("")

    return (
        <div>
            <p>Score: { score }</p>
            <p>Highest Score: { highestScore }</p>
            {
                gameOver && (
                    <div>
                        <p>Game Over!</p>
                        <p>Reason of death: { collideWith === "wall" ? "Collided with the wall" : "Run into your own body" }</p>
                        <button onClick={ () => setGameOver(false) }>Play Again</button>
                    </div>
                )
            }{
                !gameOver && (
                    <SnakeGameWindow 
                        score={score}
                        setScore={setScore}
                        isEnd={gameOver}
                    />
                )
            }
        </div>
    )
}

export default SnakeGameState