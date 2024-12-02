import React, {useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import AboutUs from '../pages/AboutUs'
import GameList from '../pages/GameList'
import Dashboard from '../pages/Dashboard.jsx'
import Themes from '../components/Themes/Themes.jsx'






function NavRouters({ loggedInUser, setLoggedInUser }) {
    const [reactionGameList, setReactionGameList] = useState([])
    const [memoryGameList, setMemoryGameList] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const responseReaction = await fetch('http://localhost:5001/api/games/getGames', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameCategory: 'reaction' })
                })
                const dataReaction = await responseReaction.json()
                setReactionGameList(dataReaction)

                const responseMemory = await fetch('http://localhost:5001/api/games/getGames', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameCategory: 'memory' })
                })
                const dataMemory = await responseMemory.json()
                setMemoryGameList(dataMemory)

            } catch (error) {
                console.log(error)
            }
        }

        fetchGames()


    },[])


    return (
        <Routes>
            <Route path="/" element={<AboutUs />} />
            <Route path="/reaction-games" element={<GameList  gameListObject={reactionGameList} category="reaction" />} />
            <Route path="/memory-games" element={<GameList  gameListObject={memoryGameList} category="memory" />} />
            <Route path="/login" element={<LoginPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
            <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
            <Route path="/themes" element={<Themes loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
        </Routes>
    )
}

export default NavRouters