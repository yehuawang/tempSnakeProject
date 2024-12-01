import React from 'react'
import SnakeGame from './Snake/SnakeGame'
import WordGame from './WordGame/WordGame'
import TypinTest from './TypinTest/TypinTest'
import EmojiMemo from './EmojiMemo/EmojiMemo'
import ReactionTest from './ReactionTest/ReactionTest'
import SequenceMemory from './SequenceMemory/SequenceMemory'
import AimTrainer from './AimTrainer/AimTrainer'
import FlipCard from './FlipCard/FlipCard'
import '../styles/Gameboard.css'

function GameLoader({ game, loggedInUser, refreshAttempts, setRefreshAttempts }) {
    console.log(loggedInUser)
    const gamebody = game.body
    if (gamebody === "snake") {
        return (
            <>
                {console.log(`passing ${loggedInUser} to Snake`)}
                <SnakeGame loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </>
        )
    } else if (gamebody === "word-game") {
        return (
            <>
                <WordGame loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </>
        )
    } else if (gamebody === "emoji-memo") {
        return (
            <>
                <EmojiMemo loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </>
        )
    } else if (gamebody === "typin-test") {
            return (
                <>
                    <TypinTest loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
                </>
            )
        
    } else if (gamebody === "reaction-test") {
        return (
            <>
                <ReactionTest loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </>
        )
    } else if (gamebody === "sequence-memory") {
        return (
            <>
                <SequenceMemory loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </>
        )
    } else if (gamebody === "aim-trainer") {
        return (
            <>
                <AimTrainer loggedInUser={loggedInUser} refreshAttempts={refreshAttempts} setRefreshAttempts={setRefreshAttempts} />
            </>
        )
    } else if (gamebody === "flip-cards") {
        return (
            <>
                <FlipCard loggedInUser={loggedInUser} setRefreshAttempts={setRefreshAttempts} />
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