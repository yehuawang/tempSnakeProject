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
    }
}

export default GameLoader