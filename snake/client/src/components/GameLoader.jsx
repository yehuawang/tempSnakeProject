import Snake from './SnakeGame/Snake'
import '../styles/Gameboard.css'

function GameLoader({ gamebody }) {
    console.log("gameloader received game body: ", gamebody)
    if (gamebody === "snake") {
        return (
            <div>
                <Snake />
            </div>
        )
    } else {
        return (
            <div>
                <h1>Game coming soon!</h1>
            </div>
        )
    }
}

export default GameLoader