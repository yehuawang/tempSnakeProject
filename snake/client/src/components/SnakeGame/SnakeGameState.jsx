import { useState, useEffect } from 'react'
import SnakeGameWindow from './SnakeGameWindow'

function SnakeGameState({ loggedInUser }) {
    const playerEmail = loggedInUser.email

    const [score, setScore] = useState(0)   
    const [highestScore, setHighestScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [collideWith, setCollideWith] = useState("")

    
    
    useEffect(() => {
        const fetchHighestScore = async () => {
            try {
                console.log("passing playerEmail: ", playerEmail, "to fetchHighestScore")

                const existResponse = await fetch('http://localhost:5001/api/snake/score/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: playerEmail
                    })
                })

                const isRecordExist = await existResponse.json()
                console.log("isRecordExist is:\n", isRecordExist)
                const isRecordExistBool = isRecordExist.recordFound
                console.log(`isRecordExistBool is: ${isRecordExistBool}`)

                if(isRecordExistBool === false) {
                    const createResponse = await fetch('http://localhost:5001/api/snake/score/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userEmail: playerEmail
                        })
                    })
                    const newRecord = await createResponse.json()
                    console.log("new record created is:\n", newRecord)
                    setHighestScore(0)
                } else {
                    console.log("record already exist!")
                    const getResponse = await fetch('http://localhost:5001/api/snake/score/get', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userEmail: playerEmail
                        })
                    })
                    const data = await getResponse.json()
                    console.log("data fetched from existing record is:\n", data)
                    setHighestScore(data.record.highest_Score)
                }
            } catch (error) {
                console.log('Error fetching highest score: ', error)
            }
        }
        playerEmail !== "guest" && fetchHighestScore()
    },[loggedInUser])

    useEffect(() => {
        const updateHighestScore = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/snake/score/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: playerEmail,
                        newHighScore: score
                    })
                })
                const data = await response.json()
                console.log("data is", data)
                const recordUpdated = data.record.highest_Score
                console.log("recordUpdated is", recordUpdated)
                console.log(`Highest score updated: ${recordUpdated}`)
                setHighestScore(recordUpdated)
            } catch (error) {
                console.log('Error updating highest score: ', error)
            }
        }
        gameOver && playerEmail !== "guest" && (score > highestScore) && updateHighestScore()
    },[gameOver])

    return (
        <div className="snake-game-div">
            
            <p>Score: { score }</p>
            <p>Highest Score: { highestScore }</p>
            {   
                !gameStart ? ( 
                    <button className="start-snake-game-button" onClick={ () => setGameStart(true) }>Start Game</button>
                ) : (
                    gameOver ? (
                        <div>
                            <p>Game Over!</p>
                            <p>Reason of death: { collideWith === "wall" ? "Collided with the wall" : "Run into your own body" }</p>
                            <button className="play-snake-game-again-button" onClick={ () => setGameOver(false) }>Play Again</button>
                        </div>
                    ) : (
                        <SnakeGameWindow 
                            score={score}
                            setScore={setScore}
                            gameOver={gameOver}
                            setGameOver={setGameOver}
                            collidedWith={collideWith}
                            setCollideWith={setCollideWith}
                        />
                    )
                )
            }
        </div>
    )
}

export default SnakeGameState