import { useState } from 'react'
import Dashboard from './Dashboard'
import '../styles/LoginPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginPage({ loggedInUser, setLoggedInUser }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSignedUp, setIsSignedUp] = useState(false)

    const handleRegisterNewUser = async (e) => {
        e.preventDefault()
        const user = { name, email, password }
        try {
            const response = await fetch('http://localhost:5001/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error('Failed to register user')
            } else {
                setIsSignedUp(true)
                setMessage("new user registered successfully")
            }
        } catch (error) {
            console.log(error)
            setMessage("Failed to register user")
        }
    }

    const handleUserLogin = async (e) => {
        e.preventDefault()
        const user = { email, password }
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error('Failed to login user')
            } else {
                const data = await response.json()
                setLoggedInUser({
                    email: data.data.user.email,
                    name: data.data.user.name,
                    profileImage: data.data.user.profile_image
                })
                console.log(loggedInUser)
                setIsLoggedIn(true)
                setMessage("logged in user successfully")
            }
        } catch (error) {
            console.log(error)
            setMessage("Failed to log in user")
        }
    }

    const switchLoginSignup = () => {
        setIsSignedUp(!isSignedUp)
        setMessage('')
    }

  
    return (
        <>
            {/* redirect to dashboard if IsLoggedIn is true */}
            {
                loggedInUser.email !== 'guest' && (
                    <Dashboard loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                )
            }

            { loggedInUser.email === 'guest' && (
                <div className="login-container">
                    <div className="login-content">
                        <h2>{ isSignedUp ? 'Log In' : 'Sign Up' }</h2>

                        {/* Log In */}
                        { isSignedUp && (
                            <form className="signup-form" onSubmit={handleUserLogin}>
                                <div className="form-container">
                                    <div className="form-box">
                                        <input
                                            id="email-input"
                                            type="email"
                                            placeholder="yourname@example.com" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-box">
                                        <input
                                            id="password-input"
                                            type="password" 
                                            placeholder="password..."
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="assist-box">
                                    <span onClick={ switchLoginSignup }>Sign up</span>
                                    <span>Forgot Password</span>
                                </div>
                                <div className="form-box">
                                    <button className="login-button" type="submit">Log in now!</button>
                                </div>
                            </form>
                        )}


                        {/* Sign Up */}
                        { !isSignedUp && (
                            <form className="signup-form" onSubmit={handleRegisterNewUser}>
                                <div className="form-container">
                                    <div className="form-box">
                                        <input
                                            id="name-input"
                                            type="text" 
                                            placeholder="Your Name"
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-box">
                                        <input
                                            id="email-input"
                                            type="email"
                                            placeholder="yourname@example.com" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-box">
                                        <input
                                            id="password-input"
                                            type="password" 
                                            placeholder="password..."
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="assist-box">
                                    <span onClick={ switchLoginSignup }>Log in</span>
                                    <span>Forgot Password</span>
                                </div>
                                <div className="form-box">
                                    <button className="login-button" type="submit">Sign up now!</button>
                                </div>
                            </form>
                        )}
                        <div className="response-message">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
  }
  
  export default LoginPage