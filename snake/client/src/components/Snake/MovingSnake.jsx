import React, {useEffect, useState} from 'react'
import '../../styles/MovingSnake.css'

function MovingSnake() {

    // the moving snake for the baord only have x coordinates and is 1D
    const UNIT_SIZE = 20;
    const [board, setBoard] = useState([]);
    const [snake, setSnake] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setSnake([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
            setBoard([]);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const initiateSnakeBoard = () => {
        const numCells = Math.floor(windowWidth / UNIT_SIZE);
        const boardArray = Array(numCells).fill('');
        snake.forEach(index => {
            if (index < numCells) {
                boardArray[index] = 'S';
            }
        });
        setBoard(boardArray);
    }

    const moveSnake = () => {
        const numCells = Math.floor(windowWidth / UNIT_SIZE);
        const newSnake = snake.map(index => {
            if (index + 1 < numCells) {
                return index + 1;
            } else {
                return numCells - index - 1;
            }
        });
        setSnake(newSnake);
        updateBoard(newSnake, numCells);
    }

    const updateBoard = (newSnake, numCells) => {
        const boardArray = Array(numCells).fill('');
        newSnake.forEach(index => {
            if (index < numCells) {
                boardArray[index] = 'S';
            }
        });
        setBoard(boardArray);
    }

    useEffect(() => {
        initiateSnakeBoard();
    },[windowWidth])

    useEffect(() => {
        const interval = setInterval(() => {
            moveSnake();
        }, 100);

        return () => clearInterval(interval);
    }, [snake]);

    return (
        <div
            className="snake-game-1d-grid"
            style={{ gridTemplateColumns: `repeat(${Math.floor(windowWidth / UNIT_SIZE)}, ${UNIT_SIZE}px)` }}
        >
            {
                board.map((cell, cellIndex) => (
                    <div
                        key={cellIndex}
                        className={`snake-game-box ${cell === 'S' ? 'snake-square' : ''}`}
                    ></div>
                ))
            }
        </div>
    )
}

export default MovingSnake