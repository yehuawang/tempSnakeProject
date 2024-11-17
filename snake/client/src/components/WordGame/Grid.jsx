import React, { useState, useEffect } from 'react';
import '../../styles/WordGame.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dictionary from '../../data/wordGameDic.js';


// short dictionary for testing...
// const dictionary = [
//     'apple', 'arrow', 'awake', 'amaze', 'alarm'
// ];

function Grid({ loggedInUser, coinsToEarn, setCoinsToEarn, setGameStarted, userWin, setUserWin }) {
    const [gameState, setGameState] = useState({
        secret: dictionary[Math.floor(Math.random() * dictionary.length)],
        grid: Array(5).fill().map(() => Array(5).fill('')),
        currentColPosition: 0,
        currentRowPosition: 0,
        gameEnded: false
    });

    useEffect(() => {
        const handleKey = (e) => {
            if (gameState.gameEnded) return;

            const keyStroke = e.key;

            if (keyStroke === 'Backspace') {
                deleteLetter();
            }

            if (keyStroke === 'Enter') {
                console.log(`secret is ${gameState.secret}`);
                if (gameState.currentColPosition === 5) {
                    const word = getCurrentWord();
                    if (isWordInDictionary(word)) {
                        showWord(word);
                        if (word === gameState.secret) {
                            setGameState((prevState) => ({
                                ...prevState,
                                gameEnded: true,
                            }));
                            setUserWin(true);
                            alert('Congratulations! You guessed the word!');
                        } else if (gameState.currentRowPosition === 4) {
                            setGameState((prevState) => ({
                                ...prevState,
                                gameEnded: true
                            }));
                            alert(`Game over! The word was ${gameState.secret}.`);
                        } else {
                            setGameState((prevState) => ({
                                ...prevState,
                                currentRowPosition: prevState.currentRowPosition + 1,
                                currentColPosition: 0
                            }));
                            setCoinsToEarn((prevCoins) => prevCoins - 2)
                        }
                    } else {
                        alert("This is not a word.");
                    }
                } else {
                }
            }

            if (isLetterKey(keyStroke)) {
                writeLetter(keyStroke);
            }
        };

        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [gameState]);


    useEffect(() => {
        const updateUserCoins = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/updateCoinCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: loggedInUser.email,
                        deltaCoinCount: coinsToEarn
                    })
                });
                const data = await response.json();
                console.log(data);
                const newCoinCount = data.newCoinCount;
                console.log(newCoinCount);
            } catch (error) {
                console.log(error);
            }
        }
        if (userWin) {
            updateUserCoins();
        }
    }, [userWin]);

    const getCurrentWord = () => {
        return gameState.grid[gameState.currentRowPosition].join('');
    };

    const isLetterKey = (keyStroke) => {
        return keyStroke.length === 1 && keyStroke.match(/[a-z]/i);
    };

    const writeLetter = (keyStroke) => {
        if (gameState.currentColPosition < 5) {
            const newGrid = [...gameState.grid];
            newGrid[gameState.currentRowPosition][gameState.currentColPosition] = keyStroke;
            setGameState((prevState) => ({
                ...prevState,
                grid: newGrid,
                currentColPosition: prevState.currentColPosition + 1
            }));
        }
    };

    const deleteLetter = () => {
        if (gameState.currentColPosition > 0) {
            const newGrid = [...gameState.grid];
            newGrid[gameState.currentRowPosition][gameState.currentColPosition - 1] = '';
            setGameState((prevState) => ({
                ...prevState,
                grid: newGrid,
                currentColPosition: prevState.currentColPosition - 1
            }));
        }
    };

    const isWordInDictionary = (word) => {
        return dictionary.includes(word);
    };

    const showWord = (guess) => {
        const row = gameState.currentRowPosition;
        const animationDuration = 400;
        for (let i = 0; i < 5; i++) {
            const box = document.querySelector(`#box-R${row}-C${i}`);
            const letter = box.textContent;

            setTimeout(() => {
                if (letter === gameState.secret[i]) {
                    box.classList.add('right-placement');
                } else if (gameState.secret.includes(letter)) {
                    box.classList.add('wrong-placement');
                } else {
                    box.classList.add('wrong-empty');
                }
                box.classList.add('animated');
            }, i * animationDuration);
        }
    };

    const createGrid = () => {
        const grid = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                grid.push(
                    <div className="word-game-box" id={`box-R${i}-C${j}`} key={`box-R${i}-C${j}`}>
                        {gameState.grid[i][j]}
                    </div>
                );
            }
        }
        return <div className="word-game-grid">{grid}</div>;
    };

    return (
        <div>
            {createGrid()}
            {
                gameState.gameEnded ? (
                    !userWin ? (<h1 className="game-heading win-word-game"><p>Game Over!</p>the correct word is: {(gameState.secret).toUpperCase()}</h1>)
                    :  (
                        <>
                            <div className="game-heading win-word-game">Congrats! you guessed the word!</div>
                            <div className="game-heading win-word-game">You have earned: <span><i className="bi bi-coin"></i>{coinsToEarn}</span></div>
                        </>
                    )
                ) : (<h1 className="game-heading win-word-game">Continue guessing!</h1>)
            }   
            <button className="start-word-game-button" onClick={() => setGameStarted(false)}>Play Again</button>
        </div>
    );
}

export default Grid;