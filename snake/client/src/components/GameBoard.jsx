import '../styles/GameBoard.css'
import PreviousAttemps from './PreviousAttempt'
import HelpfulTips from './HelpfulTips'
import GameLoader from './GameLoader'

function GameBoard( {gamebody} ) {
  return (
    <div className="game-board">
        <PreviousAttemps />
        <div className="game-canvas">
            <GameLoader gamebody={gamebody} />
            <h1>game canvas here</h1>
        </div>
        <HelpfulTips />
    </div>
  )
}

export default GameBoard