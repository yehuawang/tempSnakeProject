import './styles/App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MountAllRouters from './routers/MountAllRouters'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <MountAllRouters />
                <Footer /> 
            </div>
        </BrowserRouter>
    )
}

export default App
