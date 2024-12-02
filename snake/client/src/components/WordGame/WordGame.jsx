import React, {useState, useEffect} from 'react'
import '../../styles/WordGame.css'
import Grid from './Grid'
import 'bootstrap-icons/font/bootstrap-icons.css';


function WordGame({ loggedInUser, setRefreshAttempts }) {
    const [gameStarted, setGameStarted] = useState(false)
    const [userWin, setUserWin] = useState(false)
    const [coinsToEarn, setCoinsToEarn] = useState(0)

    const handleGameStart = () => {
        setGameStarted(true)
        setUserWin(false)
        setCoinsToEarn(10)
        console.log("Game Started")
    }

    return (
        <div className="word-game-canvas">
            <div className="player-info">playing as: <span>{loggedInUser.name}</span></div>
            {
                gameStarted && (
                    <div className="player-info">
                        Coins you can earn: <span><i className="bi bi-coin"></i>{coinsToEarn}</span>
                    </div>
                )
            }
            <div className="word-game-container">

                {
                    !gameStarted ? (
                        <>
                            <h1 className="game-heading word-game-heading">Word Game</h1>
                            <button className="start-word-game-button" onClick={handleGameStart}>Start Game</button>
                        </>
                    ) : (
                        <>
                            <Grid
                                loggedInUser={loggedInUser}
                                coinsToEarn={coinsToEarn}
                                setCoinsToEarn={setCoinsToEarn}
                                setGameStarted={setGameStarted}
                                userWin={userWin}
                                setUserWin={setUserWin}
                                setRefreshAttempts={setRefreshAttempts}
                            />
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default WordGame