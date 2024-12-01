import React, { useState, useEffect } from 'react';
import AimTrainerGamePlay from './AimTrainerGamePlay';
import AimTrainerLevelSelector from './AimTrainerLevelSelector';
import '../../styles/AimTrainer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AimTrainer({ loggedInUser, setRefreshAttempts }) {
    const [level, setLevel] = useState(0);
    const [targetCount, setTargetCount] = useState(0);
    const [heartCount, setHeartCount] = useState(3);

    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    const [finalScoreToLog, setFinalScoreToLog] = useState(0);
    const [coinsEarned, setCoinsEarned] = useState(0);

    const [score, setScore] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [missedClicks, setMissedClicks] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    const handleStartGame = () => {
        setGameStarted(true);
        setGameEnded(false);
        setScore(0);
        setTotalClicks(0);
        setMissedClicks(0);
        setAccuracy(100);
    };

    const handlePlayAgain = () => {
        setLevel(0);
        setGameStarted(false);
        setGameEnded(false);
        setScore(0);
        setTotalClicks(0);
        setMissedClicks(0);
        setAccuracy(100);
        setHeartCount(3);
    };

    useEffect(() => {
        if (heartCount <= 0) {
            setHeartCount(0);
            setGameEnded(true);
            setGameStarted(false);
        }
    }, [heartCount]);

    const handleMissClick = () => {
        setTotalClicks(prevTotalClicks => prevTotalClicks + 1);
        setMissedClicks(prevMissedClicks => prevMissedClicks + 1);
        const newAccuracy =(totalClicks - missedClicks) / (totalClicks + 1) * 200;
        setAccuracy(newAccuracy);
    };

    
    const handleUpdateUserCoins = async () => {
        try {
            console.log("now will update coin count in database to +" + coinsEarned)
            await fetch('http://localhost:5001/api/users/updateCoinCount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: loggedInUser.email,
                    deltaCoinCount: coinsEarned
                })
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpdateUserFinalScore = async () => {
        try {
            await fetch('http://localhost:5001/api/games/updateUserScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: 'R-2',
                    userEmail: loggedInUser.email,
                    userScore: finalScoreToLog
                })
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const updatePrevAttempts = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/attempts/addNewAttempt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: loggedInUser.email, gameId: 'R-2', score: score})
            });
            if (response.ok) {
                console.log('prev attempts updated');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (gameEnded) {
            const finalScore = Math.floor(score * level * (accuracy / 100));
            setFinalScoreToLog(finalScore);
            setCoinsEarned(Math.floor(finalScore / 5));
            if (loggedInUser.name !== "guest") {
                handleUpdateUserCoins();
                handleUpdateUserFinalScore();
                setRefreshAttempts(true);
                updatePrevAttempts();
            }
        }
    }, [gameEnded]);

    // useEffect(() => {
    //     if (gameEnded && loggedInUser.name !== "guest") {
    //         handleUpdateUserCoins();
    //         handleUpdateUserFinalScore();
    //     }
    // },[coinsEarned])

    return (
        <div className="aim-trainer-gameplay-wrapper" onClick={handleMissClick}>
            <p>Playing as: <span>{ loggedInUser.name }</span></p>
            {
                level === 0 && !gameStarted ? (
                    <AimTrainerLevelSelector setLevel={setLevel} setTargetCount={setTargetCount} setHeartCount={setHeartCount} />
                ) : (
                    <>
                        <div>Level: {level}</div>
                        <div className="score-container">
                            <div>Score: {score}</div>
                            <div>Accuracy: {accuracy.toFixed(2)}%</div>
                        </div>
                        <div className="heart-container">
                            {
                                Array(Math.max(heartCount, 0)).fill(0).map((_, index) => (
                                    <i key={index} className="bi bi-heart-fill"></i>
                                ))
                            }
                        </div>
                        {
                            gameEnded ? (
                                <>
                                    <div>
                                        <h2>Game Over</h2>
                                        <p>Coins Earned: {coinsEarned}</p>
                                        <p>Final Score: {finalScoreToLog}</p>
                                    </div>
                                    <button onClick={handlePlayAgain}>Play Again</button>
                                </>
                            ) : (
                                gameStarted ? (
                                    <AimTrainerGamePlay 
                                        userEmail={loggedInUser.email} 
                                        score={score} 
                                        setScore={setScore} 
                                        level={level} 
                                        targetCount={targetCount} 
                                        heartCount={heartCount} 
                                        setHeartCount={setHeartCount} 
                                        setGameStarted={setGameStarted} 
                                        gameEnded={gameEnded} 
                                        setGameEnded={setGameEnded} 
                                        setTotalClicks={setTotalClicks} 
                                        setAccuracy={setAccuracy} 
                                        totalClicks={totalClicks} 
                                    />
                                ) : (
                                    <button onClick={handleStartGame}>Start Game</button>
                                )
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default AimTrainer;
