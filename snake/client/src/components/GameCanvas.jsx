

function Canvas(props) {
    if (props.game === "snake") {
        return (
            <canvas id="game-canvas-snake"></canvas>
        )
    }
    else if (props.game === "tetris") {
        return (
            <canvas id="game-canvas-tetris"></canvas>
        )
    }
}

export default Canvas