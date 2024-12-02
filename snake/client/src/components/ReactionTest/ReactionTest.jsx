import React, { useState, useEffect, useRef, useCallback } from 'react';
import "../../styles/ReactionTest.css"

const ReactionTest = ({ loggedInUser }) => {
  const [gameState, setGameState] = useState('idle');
  const [reactionTime, setReactionTime] = useState(10000000);
  const [coinsToEarn, setCoinsToEarn] = useState(0);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const startGame = useCallback(() => {
    setGameState('waiting');
    setCoinsToEarn(0);
    setReactionTime(10000000);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, randomDelay);
  }, []);

  const handleClick = useCallback(() => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setGameState('early');
    } else if (gameState === 'ready') {
      const endTime = Date.now();
      const reactionTimeMs = endTime - startTimeRef.current - 35;
      setReactionTime(reactionTimeMs);
      setGameState('result');
    } else {
      startGame();
    }
  }, [gameState, startGame]);

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'waiting':
        return "var(--accent-color)";
      case 'ready':
        return "var(--secondary-color)";
      default:
        return "var(--background-color)";
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'idle':
        return 'Click to start';
      case 'waiting':
        return 'Wait for colour to change...';
      case 'ready':
        return 'Click now!';
      case 'early':
        return 'Too early! Click to try again';
      case 'result':
        return (
          <>
            Your reaction time: {reactionTime} ms. <br />
            { loggedInUser.email !== "guest" && `You have earned ${coinsToEarn} coins! `}<br />
            Click to play again
          </>
        );
      default:
        return '';
    }
  };

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
              console.log('coins updated to ', coinsToEarn);
          }
      } catch (error) {
          console.log(error);
      }
  }

  const updateScore = async () => {
      try {
          const response = await fetch(`http://localhost:5001/api/games/updateUserScoreLessIsBest`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ gameId: 'R-4', userEmail: loggedInUser.email, userScore: reactionTime })
          });
          if (response.ok) {
              console.log('score sent to backend db');
          }
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    if (loggedInUser.email !== "guest") {
        if (reactionTime < 200) {
            setCoinsToEarn(3);
        } else if (reactionTime < 300) {
            setCoinsToEarn(2);
        } else if (reactionTime < 500) {
            setCoinsToEarn(1);
        }


        updateScore();
    }
  },[reactionTime])

  useEffect(() => {
    if (loggedInUser.email !== "guest" && coinsToEarn > 0) {
        updateDBCoins();
    }
  }, [coinsToEarn])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          borderRadius: '15px',
          backgroundColor: getBackgroundColor(),
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <h1 style={{ color: gameState === ('ready' || 'early') ? 'var(--accent-color)' : "var(--secondary-color)" }}>
          {getMessage()}
        </h1>
      </div>
    </>
  );
};

export default ReactionTest;