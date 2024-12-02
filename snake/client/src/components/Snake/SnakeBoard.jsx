import React, { useEffect, useState, useRef } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/Snake.css';
import { set } from 'mongoose';


const BOARD_SIZE = 20;
const INITIAL_HUNGER = 100;
const INITIAL_SNAKE_PARTS = [
    { x: 9, y: 10 },
    { x: 10, y: 10 },
    { x: 11, y: 10 }
];
let INITIAL_BOARD = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => 'E'));




function SnakeBoard({ userEmail, setRefreshAttempts }) {
    const [pause, setPause] = useState(false);
    const [coinsToEarn, setCoinsToEarn] = useState(0);
    const [gameStart, setGameStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [showLevelUpAlert, setShowLevelUpAlert] = useState(false);
    const [snakeState, setSnakeState] = useState({
        snakeParts: INITIAL_SNAKE_PARTS,
        direction: 'R',
        hunger: INITIAL_HUNGER
    });
    const [foodCoordinates, setFoodCoordinates] = useState({x: 5, y: 5});
    const [hunger, setHunger] = useState(INITIAL_HUNGER);
    const [deathReason, setDeathReason] = useState('');
    const [board, setBoard] = useState(INITIAL_BOARD);
    const gameWindow = useRef(null);

    const generateFoodCoordinates = () => {
        let coord;
        do {
            coord = {
                x: Math.floor(Math.random() * BOARD_SIZE),
                y: Math.floor(Math.random() * BOARD_SIZE)
            };
        } while (snakeState.snakeParts.some(part => part.x === coord.x && part.y === coord.y));
        return coord;
    };

    const checkWallCollision = () => {
        const snakeHead = snakeState.snakeParts[snakeState.snakeParts.length - 1];
        if (snakeHead.x > BOARD_SIZE - 1 || snakeHead.x < 0 || snakeHead.y > BOARD_SIZE - 1 || snakeHead.y < 0) {
            setDeathReason('collided with wall');
            return true;
        }
        return false;
    };

    const checkSelfCollision = () => {
        const snakeHead = snakeState.snakeParts[snakeState.snakeParts.length - 1];
        for (let i = 0; i < snakeState.snakeParts.length - 1; i++) {
            if (snakeState.snakeParts[i].x === snakeHead.x && snakeState.snakeParts[i].y === snakeHead.y) {
                setDeathReason('you ate yourself');
                return true;
            }
        }
        return false;
    };

    const setHungerAlert = () => {
        if (hunger <= 30) {
            document.querySelector('.progress-bar').classList.add('hunger-alert');
        } else {
            document.querySelector('.progress-bar').classList.remove('hunger-alert');
        }
    }

    const checkStarvedToDeath = () => {
        setHungerAlert();
        if (hunger <= 0) {
            setDeathReason('you starved to death');
            return true;
        }
        return false;
    };

    const checkEatFood = (newHead) => {
        if (newHead.x === foodCoordinates.x && newHead.y === foodCoordinates.y) {
            setFoodCoordinates(generateFoodCoordinates());
            setScore(prevScore => {
                const newScore = prevScore + 1;
                if (newScore > 0 && newScore % 5 === 0) {
                    levelUp();
                }
                return newScore;
            });
            setHunger(INITIAL_HUNGER);
            return true;
        }
        return false;
    };

    const levelUp = () => {
        setShowLevelUpAlert(true);
        setLevel(Math.ceil(score / 5) + 1);
        setCoinsToEarn(prevCoins => prevCoins + level);
        console.log('level up, level is now: ', level);
    };

    useEffect(() => {
        const levelUpAlertTimer = () => {setTimeout(() => {
            setShowLevelUpAlert(false);
        }, 2000);}

        levelUpAlertTimer();
    }, [showLevelUpAlert]);

    const move = () => {
        let newSnakeParts = []
        for (let i = 0; i < snakeState.snakeParts.length; i++) {
            newSnakeParts.push({ ...snakeState.snakeParts[i] });
        }
        let newHead = newSnakeParts[newSnakeParts.length - 1];
        let dir = snakeState.direction;

        switch (dir) {
            case 'U': 
                newHead = { x: newHead.x, y: newHead.y - 1 };
                break;
            case 'L': 
                newHead = { x: newHead.x - 1, y: newHead.y };
                break;
            case 'D': 
                newHead = { x: newHead.x, y: newHead.y + 1 };
                break;
            case 'R': 
                newHead = { x: newHead.x + 1, y: newHead.y };
                break;
            default:
                break;
        }

        newSnakeParts.push(newHead);
        

        if (!checkEatFood(newHead)) {
            newSnakeParts.shift();
        }

        setSnakeState({
            ...snakeState,
            snakeParts: newSnakeParts
        });
    };

    

    const handleKeyPress = (e) => {
        if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && snakeState.direction !== 'D') {
            setSnakeState({
                ...snakeState,
                direction: 'U'
            });
        } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && snakeState.direction !== 'R') {
            setSnakeState({
                ...snakeState,
                direction: 'L'
            });
        } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && snakeState.direction !== 'U') {
            setSnakeState({
                ...snakeState,
                direction: 'D'
            });
        } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && snakeState.direction !== 'L') {
            setSnakeState({
                ...snakeState,
                direction: 'R'
            });
        }
    };

    const markBoard = () => {
        let newBoard = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => 'E'));
    
        snakeState.snakeParts.forEach((part) => {
            newBoard[part.x][part.y] = 'S';
        })
        newBoard[foodCoordinates.x][foodCoordinates.y] = 'F';
        setBoard(newBoard);
    };

    useEffect(() => {
        if (gameStart && !gameOver) {
            const interval = setInterval(() => {
                if (pause) {
                    return;
                }
                move();
                if (checkWallCollision() || checkSelfCollision() || checkStarvedToDeath()) {
                    setGameOver(true);
                    clearInterval(interval);
                    return
                }
                setHunger((prevHunger) => prevHunger - Math.floor(level / 5 + 1));
                markBoard();
            }, 100 - (level-1) * 5); 

            return () => clearInterval(interval); 
        }

        if (gameOver) {
            const updateDBCoins = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/api/users/updateCoinCount`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userEmail: userEmail, deltaCoinCount: coinsToEarn })
                    });
                    if (response.ok) {
                        console.log('coins updated');
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            const updateScore = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/api/games/updateUserScore`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ gameId: 'R-1', userEmail: userEmail, userScore: score })
                    });
                    if (response.ok) {
                        console.log('score sent to backend db');
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            const updatePrevAttempts = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/api/attempts/addNewAttempt`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userEmail: userEmail, gameId: 'R-1', score: score})
                    });
                    if (response.ok) {
                        console.log('prev attempts updated');
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (userEmail !== 'guest') {
                updateDBCoins();
                updateScore();
                setRefreshAttempts(true);
                updatePrevAttempts();
            }
        }
    }, [gameStart, snakeState, gameOver]);


    return (
        <div
            className="snake-game-board"
            tabIndex={0}
            onKeyDown={handleKeyPress}
            ref={gameWindow}
        >
            {
                !gameStart && (
                    <button
                        className="snake-game-button"
                        onClick={() => {
                            setGameStart(true);
                            gameWindow.current.focus();
                        }}
                    >
                        Start Game
                    </button>
                )
            }
            {
                gameOver && (
                    <div>
                        <h1>Game Over</h1>
                        <p>Reason of death: <span>{deathReason}</span></p>
                        <p>Your score is: <span>{score}</span></p>
                        <p>You have earned <i className="bi bi-coin"></i><span>{coinsToEarn}</span></p>
                        <button onClick={() => {
                            setGameOver(false);
                            setGameStart(false);
                            setScore(0);
                            setLevel(1);
                            setPause(false);
                            setSnakeState({
                                snakeParts: [
                                    { x: 9, y: 10 },
                                    { x: 10, y: 10 },
                                    { x: 11, y: 10 }
                                ],
                                direction: 'R',
                                hunger: INITIAL_HUNGER
                            });
                            setFoodCoordinates(generateFoodCoordinates());
                            setHunger(INITIAL_HUNGER);
                            setBoard(INITIAL_BOARD);
                        }}>Restart</button>
                    </div>
                )
            }
            {
                gameStart && !gameOver && (
                    <>
                        <div className="hunger-bar">
                            <div className="stat-info">
                                <p>level: <span>{level}</span></p>
                                <p>score: <span>{score}</span></p>
                                <p><i className="bi bi-coin"></i> <span>{coinsToEarn}</span></p>
                            </div>
                            <div>hunger: {hunger}/100</div><ProgressBar now={hunger} />
                        </div>
                        <div
                            className="snake-game-grids"
                        >
                            {
                                board.map((row, rowIndex) => (
                                    <div
                                        key={rowIndex}
                                        className="snake-game-row"
                                    >
                                        {
                                            row.map((cell, cellIndex) => (
                                                <div
                                                    key={cellIndex}
                                                    className={`snake-game-box ${cell === 'S' ? 'snake-square' : cell === 'F' ? 'food-square' : ''}`}
                                                ></div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="snake-game-controls">
                            <h3 style={{opacity: `${showLevelUpAlert ? 1 : 0}`, transition: "0.5s ease-in-out"}}>Level Up!</h3>
                            <button onClick={() => setPause(!pause)}>pause</button>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default SnakeBoard;