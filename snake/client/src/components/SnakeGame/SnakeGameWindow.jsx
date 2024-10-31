import React, { useRef, useEffect, useState } from 'react'

const UNIT_SIZE = 20
const SNAKE_VELOCITY = UNIT_SIZE
const INITIAL_SNAKE_SIZE = 5
const BOARD_WIDTH = 500
const BOARD_HEIGHT = 500
const FRAME = 100

const SnakeGameWindow = ({ score, setScore, isGameOver }) => {
    const windowRef = useRef(null)
    const [dir, setDir] = useState("D")
    const [snake, setSnake] = useState(spawnSnake)
    const [food, setFood] = useState(spawnFood)
    const [moved, setMoved] = useState(false)

    function spawnSnake() {
        let snake = []
        for (let i = 0; i < INITIAL_SNAKE_SIZE; i++) {
            snake.push({ x: 100 - (i * UNIT_SIZE), y: 100 })
        }
        const snakeCoordinates = snake.map(body => `(${body.x}, ${body.y})`).join(", ")
        console.log("Initial snake has been spawned as: " + snakeCoordinates);
        return snake
    }

    function spawnFood() {
        let newFood
        let isOnSnake
        do {
            isOnSnake = false
            newFood = {
                x: Math.floor(Math.random() * (BOARD_WIDTH / UNIT_SIZE)) * UNIT_SIZE,
                y: Math.floor(Math.random() * (BOARD_HEIGHT / UNIT_SIZE)) * UNIT_SIZE
            }
            for (let body of snake) {
                if (body.x === newFood.x && body.y === newFood.y) {
                    isOnSnake = true
                    break
                }
            }
        } while (isOnSnake)
        return newFood
    }

    useEffect(() => {
        const canv = windowRef.current
        const context = canv.getContext("2d")

        const handleKey = (e) => {
            if (!moved){
                switch (e.key) {
                    case "w":
                        if (dir !== "S") {
                            setDir("W")
                            setMoved(true)
                            console.log("direction \"" + dir + "\" has been set")
                        }
                        break
                    case "a":
                        if (dir !== "D") {
                            setDir("A")
                            setMoved(true)
                            console.log("direction \"" + dir + "\" has been set")
                        }
                        break
                    case "s":
                        if (dir !== "W") {
                            setDir("S")
                            setMoved(true)
                            console.log("direction \"" + dir + "\" has been set")
                        }
                        break
                    case "d":
                        if (dir !== "A") {
                            setDir("D")
                            setMoved(true)
                            console.log("direction \"" + dir + "\" has been set")
                        }
                        break
                    default:
                        break
                }
            }
        }

        window.addEventListener("keydown", handleKey)

        const frame = setInterval(() => {
            context.clearRect(0, 0, canv.width, canv.height)
            move()
            eatFood()
            drawSnake(context)
            drawFood(context)
            setMoved(false)
        }, FRAME)

        return () => {
            clearInterval(frame)
            window.removeEventListener("keydown", handleKey)
        }
    }, [dir, snake])

    const move = () => {
        if (dir) {
            setSnake((curSnake) => {
                const tempSnake = [...curSnake]
                const head = { ...tempSnake[0] }

                switch (dir) {
                    case "W":
                        head.y -= SNAKE_VELOCITY
                        break
                    case "A":
                        head.x -= SNAKE_VELOCITY
                        break
                    case "S":
                        head.y += SNAKE_VELOCITY
                        break
                    case "D":
                        head.x += SNAKE_VELOCITY
                        break
                    default:
                        break
                }

                tempSnake.unshift(head)
                tempSnake.pop()
                return tempSnake
            })
        }
    }

    const eatFood = () => {
        setSnake((curSnake) => {
            const head = curSnake[0]
            if (head.x === food.x && head.y === food.y) {
                const newSnake = [...curSnake, { x: head.x, y: head.y }]
                setFood(spawnFood())
                setScore(score + 1)
                return newSnake
            }
            return curSnake
        })
    }

    const drawSnake = (context) => {
        context.fillStyle = "green"
        snake.forEach((part) => {
            context.fillRect(part.x, part.y, UNIT_SIZE, UNIT_SIZE)
        })
    }

    const drawFood = (context) => {
        context.fillStyle = "red"
        context.fillRect(food.x, food.y, UNIT_SIZE, UNIT_SIZE)
    }

    return (
        <div>
            <canvas className="game-window" ref={windowRef} width={BOARD_WIDTH} height={BOARD_HEIGHT}></canvas>
        </div>
    )
}

export default SnakeGameWindow