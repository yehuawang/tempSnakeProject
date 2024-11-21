import React, { useEffect, useRef, useState } from 'react';
import "../styles/AboutUs.css"
import LogGame from '../components/LogGame';

function AboutUs() {
  const canvasRef = useRef(null);
  const initialLength = 12;

  // Initialize the snake with a length of 12
  const initializeSnake = () => {
    const snakeArray = [];
    for (let i = 0; i < initialLength; i++) {
      snakeArray.push({ x: 10 - i, y: 10 }); // Horizontally aligned snake
    }
    return snakeArray;
  };

  const [snake, setSnake] = useState(initializeSnake());
  const [direction, setDirection] = useState({ x: 1, y: 0 }); // Initially moving right

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const cellSize = 20;
    const canvasWidth = canvas.width / cellSize;
    const canvasHeight = canvas.height / cellSize;

    let interval;
    let steps = 0; // Count steps to randomize direction periodically

    const fillColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();

    const randomDirection = () => {
      const directions = [
        { x: 1, y: 0 }, // Right
        { x: -1, y: 0 }, // Left
        { x: 0, y: 1 }, // Down
        { x: 0, y: -1 }, // Up
      ];

      let newDirection;
      do {
        newDirection = directions[Math.floor(Math.random() * directions.length)];
      } while (
        newDirection.x === -direction.x && // Prevent reversing horizontally
        newDirection.y === -direction.y // Prevent reversing vertically
      );

      setDirection(newDirection);
    };

    const drawSnake = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = fillColor;
      snake.forEach(segment => {
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
      });
    };

    const moveSnake = () => {
      const newHead = {
        x: (snake[0].x + direction.x + canvasWidth) % canvasWidth,
        y: (snake[0].y + direction.y + canvasHeight) % canvasHeight,
      };

      const newSnake = [newHead, ...snake.slice(0, -1)];
      setSnake(newSnake);
    };

    const gameLoop = () => {
      moveSnake();
      drawSnake();

      steps++;
      if (steps % 10 === 0) {
        randomDirection(); // Change direction every 10 steps
      }
    };

    interval = setInterval(gameLoop, 200);

    return () => clearInterval(interval);
  }, [snake, direction]);

  return (
    <div className="page-element-div">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Snake</strong>, a platform dedicated to enhancing your brainpower and cognitive skills
        through interactive and engaging games. Our mission is to make learning and mental exercise fun, while
        challenging you to think faster, smarter, and more creatively.
      </p>
      <p>
        Why "Snake"? Snakes are remarkable creatures known for their intelligence, quick reflexes, and adaptability.
        Many species demonstrate problem-solving abilities and are capable of learning from their experiences.
      </p>
      <p>
        Just like snakes that navigate complex environments with precision, our games are designed to challenge your
        mind to be agile and efficient. Whether it's enhancing memory, improving focus, or boosting logical reasoning,
        <strong> Snake</strong> is your partner in unlocking mental potential.
      </p>
      <br />
      <br />
      <br />
      <br />
      
      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        style={{
          width: '100%',
          height: '100px',  
          border: '0px solid #ddd',
          display: 'block',
          margin: '20px auto',
          backgroundColor: 'var(--primary-color)',
        }}
      ></canvas>
        {/* Developer use to add new games into database in a simple way... */}
      {/* <LogGame /> */}
    </div>
  );
}

export default AboutUs;