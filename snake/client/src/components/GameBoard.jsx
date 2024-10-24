import './GameBoard.css'
import PreviousAttemps from './PreviousAttempt'
import HelpfulTips from './HelpfulTips'
import GameCanvas from './GameCanvas'

function GameBoard(props) {
  return (
    <div className="game-board">
        <PreviousAttemps />
        <div className="game-canvas">
            <GameCanvas game="snake" />
        </div>
        <HelpfulTips />
    </div>
  )
}

export default GameBoard