import React, { useState, useRef, useCallback } from 'react';
import "../../styles/ReactionTest.css"

const ReactionTest = () => {
  const [gameState, setGameState] = useState('idle');
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const startGame = useCallback(() => {
    setGameState('waiting');
    setReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2-5 seconds
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
        return `Your reaction time: ${reactionTime} ms. Click to try again`;
      default:
        return '';
    }
  };

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