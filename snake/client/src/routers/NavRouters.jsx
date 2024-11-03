import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AboutUs from '../pages/AboutUs'
import GameList from '../pages/GameList'
import ChatBot from '../pages/ChatBot.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import { reactionGameList, memoryGameList } from '../data/tempGameListDatabase.js'

function NavRouters({ loggedInUser, setLoggedInUser }) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reaction-games" element={<GameList  gameListObject={reactionGameList} />} />
            <Route path="/memory-games" element={<GameList  gameListObject={memoryGameList} />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path="/login" element={<LoginPage loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
            <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
            <Route path="/chatbox" element={<ChatBot />} />
        </Routes>
    )
}

export default NavRouters