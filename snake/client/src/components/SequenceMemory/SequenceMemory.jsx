import React, {useState, useEffect} from 'react';
import SequenceBoard from "./SequenceBoard";
import SequenceInfoPanel from "./SequenceInfoPanel";
import "../../styles/SequenceMemory.css"
import bell from '../../sounds/bell.mp3';
import playSound from '../Audio/playSound.js'


const cards = Array.from({ length: 9 }, (_, i) => `Card ${i + 1}`);

function SequenceMemory({ loggedInUser, setRefreshAttempts }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Press to Play!");
  const [flashSpeed, setFlashSpeed] = useState(700); 
  const [highlightedCard, setHighlightedCard] = useState(null);

  const [coinsToEarn, setCoinsToEarn] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  const playSoundInstance = playSound(bell);

  useEffect(() => {
      return () => {
          playSoundInstance.stop();
      };
  }, []);


  const tabulateCoinsToEarn = () => {
    setCoinsToEarn(level);
  }

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
                body: JSON.stringify({ gameId: 'M-4', userEmail: loggedInUser.email, userScore: score })
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
                body: JSON.stringify({ userEmail: loggedInUser.email, gameId: 'M-4', score: score})
            });
            if (response.ok) {
                console.log('prev attempts updated');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (gameOver && loggedInUser.email !== "guest") {
            updateDBCoins();
            updateScore();
            setRefreshAttempts(true);
            updatePrevAttempts();
        }
    },[gameOver])


  useEffect(() => {
    if (userSequence.length && userSequence.length === sequence.length) {
      if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        setMessage("Correct! Get ready for the next round.");
        setScore((prev) => prev + level);
        setTimeout(() => nextRound(), 1000);
      } else {
        setMessage("Game Over! Try again.");
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  }, [userSequence]);

  const getRandomCard = (excludeCard) => {
    let newCard;
    do {
        newCard = cards[Math.floor(Math.random() * cards.length)];
    } while (newCard === excludeCard);
    return newCard;
  };

  const nextRound = () => {
    tabulateCoinsToEarn();
    setUserSequence([]);
    setSequence((prev) => {
        const newCard = getRandomCard(prev.length ? prev[prev.length - 1] : null);
        return [...prev, newCard];
    });
    setLevel((prev) => prev + 1);
    if (flashSpeed > 300) {
      setFlashSpeed((prev) => prev - 50);
    }
    clearCardClasses();
  };

  const handleStart = () => {
    setSequence([getRandomCard(null)]);
    setUserSequence([]);
    setLevel(1);
    setScore(0);
    setFlashSpeed(700);
    setIsPlaying(true);
    setMessage("Watch the sequence...");
    clearCardClasses();
    setGameOver(false);
    setCoinsToEarn(0);
  };

  const clearCardClasses = () => {
    cards.forEach(card => {
      const cardElement = document.getElementById(card);
      if (cardElement) {
        cardElement.classList.remove('clicked', 'correct', 'wrong');
      }
    });
  };

  const handleCardClick = (card) => {

    playSoundInstance.play();
    if (!isPlaying) return;
    setUserSequence((prev) => [...prev, card]);
    const isCorrect = sequence[userSequence.length] === card;
    const cardElement = document.getElementById(card);
    cardElement.classList.add('highlight');
    setTimeout(() => {
        cardElement.classList.remove('highlight');
        cardElement.classList.add('clicked');
        if (isCorrect) {
            cardElement.classList.add('correct');
        } else {
            cardElement.classList.add('wrong');
        }
    }, 200);
  };

  const playSequence = async () => {
    setMessage("Watch the sequence...");
    for (let card of sequence) {
      await highlightCard(card);
    }
    setMessage("Your turn!");
  };

  const highlightCard = (card) => {
    return new Promise((resolve) => {
      setHighlightedCard(card);
      setTimeout(() => {
        setHighlightedCard(null);
        setTimeout(resolve, 200);
      }, flashSpeed);
    });
  };

  useEffect(() => {
    if (sequence.length && isPlaying) playSequence();
  }, [sequence]);

  return (
    <div>
      <SequenceInfoPanel level={level} score={score} loggedInUser={loggedInUser} coinsToEarn={coinsToEarn} />
      <SequenceBoard
        cards={cards}
        onCardClick={handleCardClick}
        highlightedCard={highlightedCard}
      />
      <button className="sequence-memory-button" onClick={handleStart} disabled={isPlaying}>
        Start Game
      </button>
      <p className="sequence-memory-p">{message}</p>
    </div>
  );
}

export default SequenceMemory;

