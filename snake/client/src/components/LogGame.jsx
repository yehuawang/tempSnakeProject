import React, {useState, useEffect} from 'react'


const games = [
    {
        id: "M-4",
        name: "Sequence Memory",
        body: "sequence Memory",
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