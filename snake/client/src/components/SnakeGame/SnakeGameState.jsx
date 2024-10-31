import { useState } from 'react'
import SnakeGameWindow from './SnakeGameWindow'

function SnakeGameState() {

    const [score, setScore] = useState(0)   
    const [highestScore, setHighestScore] = useState(parseInt(localStorage.getItem('highScore')) || 0)
    const [gameOver, setGameOver] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [collideWith, setCollideWith] = useState("")

    return (
        <div>
            <p>Score: { score }</p>
            <p>Highest Score: { highestScore }</p>
            {   
                !gameStart ? ( 
                    <button onClick={ () => setGameStart(true) }>Start Game</button>
                ) : (
                    gameOver ? (
                        <div>
                            <p>Game Over!</p>
                            <p>Reason of death: { collideWith === "wall" ? "Collided with the wall" : "Run into your own body" }</p>
                            <button onClick={ () => setGameOver(false) }>Play Again</button>
                        </div>
                    ) : (
                        <SnakeGameWindow 
                            score={score}
                            setScore={setScore}
                            gameOver={gameOver}
                            setGameOver={setGameOver}
                            collidedWith={collideWith}
                            setCollideWith={setCollideWith}
                            highestScore={highestScore}
                            setHighestScore={setHighestScore}
                        />
                    )
                )
            }
        </div>
    )
}

export default SnakeGameState