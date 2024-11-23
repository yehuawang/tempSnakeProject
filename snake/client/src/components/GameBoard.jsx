import '../styles/GameBoard.css'
import GameLoader from './GameLoader'

function GameBoard({ game, loggedInUser }) {
  return (
    <div className="game-board">
        <div className="game-description">
            <h1 >Game Description</h1>
            <p>
                {game.description}
            </p>
        </div>
        <div className="game-canvas">
            <GameLoader game={game} loggedInUser={loggedInUser} />
        </div>
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