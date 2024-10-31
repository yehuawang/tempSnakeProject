import './styles/App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AboutUs from './pages/AboutUs'

function App() {

    const reactionGame = { name: "reaction game", gamebody: "snake" }
    const memoryGame = { name: "memory game", gamebody: "memory" }
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/reaction-game" element={<GamePage game={ reactionGame } />} />
                        <Route path='/memory-game' element={<GamePage game={ memoryGame }/>} />
                        <Route path='/about' element={<AboutUs />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                <Footer /> 
            </div>
        </BrowserRouter>
    )
}

export default App
