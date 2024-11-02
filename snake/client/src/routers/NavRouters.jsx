import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AboutUs from '../pages/AboutUs'
import GameList from '../pages/GameList'
import ChatBot from '../pages/ChatBot.jsx'
import { reactionGameList, memoryGameList } from '../data/tempGameListDatabase.js'

function NavRouters() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reaction-games" element={<GameList gameListObject={reactionGameList} />} />
            <Route path="/memory-games" element={<GameList gameListObject={memoryGameList} />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chatbox" element={<ChatBot />} />
        </Routes>
    )
}

export default NavRouters