import React, {useState, useEffect} from 'react'

function GameSelector({ selectedGameId, setSelectedGameId, selectedCategory, setSelectedCategory, reactionGameList, memoryGameList }) {
    return (
        <div className="game-selector-container">
            <div className="category-heading">
                <button onClick={() => setSelectedCategory('reaction')} className={`${selectedCategory === "reaction" && "selected"}`}>Reaction</button>
                <button onClick={() => setSelectedCategory('memory')} className={`${selectedCategory === "memory" && "selected"}`}>Memory</button>
            </div>
            {
                selectedCategory === 'reaction' ? (
                    <>
                        {reactionGameList.map(game => {
                            return <button className={`game-selector-item ${selectedGameId === game.id && "item-selected"}`} key={game.id} value={game.id} onClick={(e) => setSelectedGameId(e.target.value)}>{game.name}</button>
                        })}
                    </>
                ) : (
                    <>
                        {memoryGameList.map(game => {
                            return <button className={`game-selector-item ${selectedGameId === game.id && "item-selected"}`} key={game.id} value={game.id} onClick={(e) => setSelectedGameId(e.target.value)}>{game.name}</button>
                        })}
                    </>
                )
            }
        </div>
    )
}

export default GameSelector