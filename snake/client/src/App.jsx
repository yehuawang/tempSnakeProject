import React, { useState, useEffect } from 'react'
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
    const [userSelectedTheme, setUserSelectedTheme] = useState("default")
    console.log("App.js: loggedInUser is " + loggedInUser.email)


    useEffect(() => {
        const fetchUserSelectedTheme = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/users/getUserSelectedTheme', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: loggedInUser.email }),
                });

                const data = await res.json();
                console.log("selected theme: ", data.selectedTheme);
                setUserSelectedTheme(data.selectedTheme);
                document.body.className = userSelectedTheme;
            } catch (error) {
                console.log(error);
            }

        };

        if (loggedInUser.email !== 'guest') {
            fetchUserSelectedTheme();
        }
    }, [loggedInUser, userSelectedTheme])

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