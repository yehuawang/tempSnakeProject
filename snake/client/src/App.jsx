import './styles/App.css'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MountAllRouters from './routers/MountAllRouters'

function App() {
    const guestUser = {
        email: "guest",
        name: "guest",
        profileImage: "guest"
    }

    const [loggedInUser, setLoggedInUser] = useState(guestUser)
    console.log("App.js: loggedInUser is " + loggedInUser.email)
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar loggedInUser={loggedInUser} />
                <MountAllRouters loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                <Footer /> 
            </div>
        </BrowserRouter>
    )
}

export default App
