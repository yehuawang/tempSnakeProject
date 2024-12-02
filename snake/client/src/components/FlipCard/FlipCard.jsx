import React, {useEffect, useState} from 'react'
import '../../styles/FlipCard.css'
import bell from '../../sounds/bell.mp3';
import playSound from '../Audio/playSound.js'

function FlipCard({ loggedInUser, setRefreshAttempts }) {

    const [coinsToEarn, setCoinsToEarn] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(0);
    const [emojis, setEmojis] = useState([
        { emoji: '🍑', flipped: false, matched: false },
        { emoji: '🍑', flipped: false, matched: false },
        { emoji: '🍉', flipped: false, matched: false },
        { emoji: '🍉', flipped: false, matched: false },
        { emoji: '🥐', flipped: false, matched: false },
        { emoji: '🥐', flipped: false, matched: false },
        { emoji: '🍕', flipped: false, matched: false },
        { emoji: '🍕', flipped: false, matched: false },
        { emoji: '🍨', flipped: false, matched: false },
        { emoji: '🍨', flipped: false, matched: false },
        { emoji: '🍔', flipped: false, matched: false },
        { emoji: '🍔', flipped: false, matched: false },
        { emoji: '🍰', flipped: false, matched: false },
        { emoji: '🍰', flipped: false, matched: false },
        { emoji: '🫒', flipped: false, matched: false },
        { emoji: '🫒', flipped: false, matched: false }
    ]);
    const [shuffledEmojis, setShuffledEmojis] = useState([]);
    const [timeLeft, setTimeLeft] = useState(10);
    const [score, setScore] = useState(0);

    const initiateGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setLevel(0);
        setTimeLeft(10);
        setScore(0);
    }


    const playSoundInstance = playSound(bell);

    useEffect(() => {
        return () => {
            playSoundInstance.stop();
        };
    }, []);

    useEffect(() => {
        if (level !== 0) {
            const shuffled = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);
            setShuffledEmojis(shuffled.map(emoji => ({ ...emoji, flipped: false, matched: false })));
            setGameStarted(true);
        }
    }, [level, emojis]);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
            setGameStarted(false);
        }
    }, [gameStarted, timeLeft]);

    const updateDBCoins = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/users/updateCoinCount`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: loggedInUser.email, deltaCoinCount: coinsToEarn })
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
                body: JSON.stringify({ gameId: 'M-3', userEmail: loggedInUser.email, userScore: score })
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
                body: JSON.stringify({ userEmail: loggedInUser.email, gameId: 'M-3', score: score})
            });
            if (response.ok) {
                console.log('prev attempts updated');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCardClick = (index) => {
        playSoundInstance.play();
        const newEmojis = [...shuffledEmojis];
        newEmojis[index].flipped = !newEmojis[index].flipped;
        setShuffledEmojis(newEmojis);

        const flippedCards = newEmojis.filter(card => card.flipped && !card.matched);
        if (flippedCards.length === 2) {
            setTimeout(() => {
                if (flippedCards[0].emoji === flippedCards[1].emoji) {
                    flippedCards[0].matched = true;
                    flippedCards[1].matched = true;
                    setScore(score + level);
                    setTimeLeft(timeLeft + (4 - level) * 2);
                } else {
                    flippedCards[0].flipped = false;
                    flippedCards[1].flipped = false;
                }
                setShuffledEmojis([...newEmojis]);

                if (newEmojis.every(card => card.matched)) {
                    setGameOver(true);
                    setGameStarted(false);
                    setScore(level * timeLeft);
                    setCoinsToEarn(level * timeLeft / (3-level));
                }
            }, 500);
        }
    }

    useEffect(() => {
        if (gameOver && loggedInUser.email !== "guest") {
            updateScore();
            updateDBCoins();
            setRefreshAttempts(true);
            updatePrevAttempts();
        }
    },[gameOver])

    return (
        <>
            <div className="flipcard-wrapper">
                {
                    level === 0 ? (
                        <div className="flip-card-level-selector-container">
                            <h1>Choose your level</h1>
                            <div className="level-selector">
                                <div className="level-item" onClick={() => setLevel(1)}>Easy</div>
                                <div className="level-item" onClick={() => setLevel(2)}>Medium</div>
                                <div className="level-item" onClick={() => setLevel(3)}>Hard</div>
                            </div>
                        </div>
                    ) : (
                        !gameStarted && gameOver ? (
                            <div className="flipcard-game-over">
                                <h2>Game Over!</h2>
                                <p>Your Final Score is: {score}</p>
                                <p>You have earned <i className="bi bi-coin"></i><span>{coinsToEarn}</span></p>
                                <button className="flipcard-reset-button" onClick={initiateGame}>Play Again!</button>
                            </div>
                        ) : (
                            
                            <>
                            <h2>Boost Your Memory Skills!</h2>
                            <p>Playing as: <span>{ loggedInUser.name }</span></p>
                            <p>Time Left: <span>{ timeLeft }s</span></p>
                            <p>Score: <span>{ score }</span></p>
                            <div className="flipcard-board">
                                {shuffledEmojis.map((emoji, index) => (
                                    <div 
                                        key={index} 
                                        className={`flipcard ${emoji.flipped ? 'flipped' : ''} ${emoji.matched ? 'matched' : ''}`} 
                                        onClick={() => handleCardClick(index)}
                                    >
                                        {emoji.flipped || emoji.matched ? emoji.emoji : ''}
                                    </div>
                                ))}
                            </div>
                            <button className="flipcard-reset-button" onClick={initiateGame}>Play Again!</button>
                        </>
                        )
                    )
                }
            </div>
        </>
    )
}

export default FlipCard