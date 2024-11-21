import React, {useState, useEffect} from 'react'


const games = [
    {
        id: "R-1",
        name: "Snake",
        body: "snake",
        description: "The classic Snake game",
        category: "reaction",
        instruction: "Use the W-A-S-D keys to move the snake, eat the food to grow, do not eat yourself or bump into walls."
    },
    {
        id: "R-2",
        name: "Aim Trainer",
        body: "aim-trainer",
        description: "coming soon",
        category: "reaction",
        instruction: "coming soon"
    },
    {
        id: "R-3",
        name: "Typin Test",
        body: "typin-test",
        description: "Speed up your testing skills",
        category: "reaction",
        instruction: "Timer will go on once you pressed any keys, so start typing straight away. Use TAB to restart the test."
    },
    {
        id: "R-4",
        name: "Reaction Test",
        body: "reaction-test",
        description: "See how fast your reaction time is",
        category: "reaction",
        instruction: "Wait for the screen to change color, then click on the screen immediately. Do not click to early."
    },
    {
        id: "M-1",
        name: "Emoji Memo",
        body: "emoji-memo",
        description: "Can your brain run in parallel?",
        category: "memory",
        instruction: "Remember the current image, select the previous image."
    },
    {
        id: "M-2",
        name: "Word Game",
        body: "word-game",
        description: "Are you lucky enough to guess the word?",
        category: "memory",
        instruction: "You need to guess one secret word, you have 5 chances, you will be notified if a letter is correctly placed, wrongly placed, or not involved in the word."
    },{
        id: "M-3",
        name: "Flip Cards",
        body: "flip-cards",
        description: "coming soon",
        category: "memory",
        instruction: "coming soon"
    }
]


function LogGame() {
    const [startLogging, setStartLogging] = useState(false)

    const logGame = async (game) => {
        try {
            console.log(`creating game ${game.name}...`)
            const response = await fetch('http://localhost:5001/api/games/createGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: game.id,
                    gameName: game.name,
                    gameBody: game.body,
                    gameDescription: game.description,
                    gameCategory: game.category,
                    gameInstruction: game.instruction
                }) 
            })
            const data = await response.json()
            console.log(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (startLogging) {
            games.forEach(game => {
                logGame(game)
            })
        }
    }, [startLogging])




    return (
        <div>

            <button onClick={() => setStartLogging(true)}>Start Logging</button>
        </div>
    )
}

export default LogGame