
function GameHeader({ gameName, loggedInUser }) {
    return (
        <div className="game-header">
            <h1 className="game-heading">{ gameName }</h1>
        </div>
    )
}

export default GameHeader