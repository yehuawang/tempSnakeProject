import React from 'react'
import Snake from './SnakeGame/Snake'
import WordGame from './WordGame/WordGame'
import TypinTest from './TypinTest/TypinTest'
import EmojiMemo from './EmojiMemo/EmojiMemo'
import ReactionTest from './ReactionTest/ReactionTest'
import '../styles/Gameboard.css'

function GameLoader({ game, loggedInUser }) {
    console.log(loggedInUser)
    const gamebody = game.body
    if (gamebody === "snake") {
        return (
            <>
                {console.log(`passing ${loggedInUser} to Snake`)}
                <Snake loggedInUser={loggedInUser} />
            </>
        )
    } else if (gamebody === "word-game") {
        return (
            <>
                <WordGame loggedInUser={loggedInUser} />
            </>
        )
    } else if (gamebody === "emoji-memo") {
        return (
            <>
                <EmojiMemo loggedInUser={loggedInUser} />
            </>
        )
    } else if (gamebody === "typin-test") {
            return (
                <>
                    <TypinTest loggedInUser={loggedInUser} />
                </>
            )
        
    } else if (gamebody === "reaction-test") {
        return (
            <>
                <ReactionTest loggedInUser={loggedInUser} />
            </>
        )
    } else {
        return (
            <>
                <h1>Game coming soon!</h1>
            </>
        )
    }
}

export default GameLoader