import '../styles/GameBoard.css'
import PreviousAttemps from './PreviousAttempt'
import HelpfulTips from './HelpfulTips'
import GameLoader from './GameLoader'

function GameBoard({ gamebody, loggedInUser }) {
  return (
    <div className="game-board">
        <PreviousAttemps />
        <div className="game-canvas">
            <GameLoader gamebody={gamebody} loggedInUser={loggedInUser} />
        </div>
        <HelpfulTips />
    </div>
  )
}

export default GameBoard