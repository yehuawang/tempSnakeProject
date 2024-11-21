import '../styles/GameBoard.css'
import PreviousAttemps from './PreviousAttempt'
import HelpfulTips from './HelpfulTips'
import GameLoader from './GameLoader'

function GameBoard({ game, loggedInUser }) {
  return (
    <div className="game-board">
        {/* <PreviousAttemps /> */}
        <div className="game-description">
            <h1 >Game Description</h1>
            <p>
                {game.description}
            </p>
        </div>
        <div className="game-canvas">
            <GameLoader game={game} loggedInUser={loggedInUser} />
        </div>
        {/* <HelpfulTips /> */}
        <div className="game-description">
            <h1 >Game Instruction</h1>
            <p>
                {game.instruction}
            </p>
        </div>
    </div>
  )
}

export default GameBoard