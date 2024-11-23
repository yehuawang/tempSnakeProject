import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import RankChart from '../Charts/RankChart'
import GameSelector from './GameSelector'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/GameStats.css'


function GameStats({ userEmail }) {
    const [selectedGameId, setSelectedGameId] = useState('R-1')
    const [selectedCategory, setSelectedCategory] = useState('reaction')
    const [reactionGames, setReactionGames] = useState([])
    const [memoryGames, setMemoryGames] = useState([])

    useEffect(() => {
        const fetchGames = async (category) => {
            try {
                const response = await fetch('http://localhost:5001/api/games/getGames', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameCategory: category })
                })
                if (response.ok) {
                    const data = await response.json()
                    if (category === 'reaction') {
                        setReactionGames(data)
                    } else if (category === 'memory') {
                        setMemoryGames(data)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchGames('reaction')
        fetchGames('memory')
    },[userEmail])


    return (
        <>
            {
                userEmail === "guest" ? (
                    <h1> log in to see game statistics ...</h1>
                ) : (
                    <div className="game-stats-container">
                        <GameSelector 
                            selectedGameId={selectedGameId} 
                            setSelectedGameId={setSelectedGameId} 
                            selectedCategory={selectedCategory} 
                            setSelectedCategory={setSelectedCategory}
                            reactionGameList={Array.from(reactionGames).map(game => {return {id: game.id, name: game.name, className: 'game-selector-item'}})}
                            memoryGameList={Array.from(memoryGames).map(game => {return {id: game.id, name: game.name, className: 'game-selector-item'}})}
                        />
                        <RankChart selectedGameId={selectedGameId} userEmail={userEmail} />
                    </div>
                )
            }
        </>
    )
}

export default GameStats