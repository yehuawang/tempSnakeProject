import { useState } from 'react'

import '../styles/LoginPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
  
    const handleSubmitUser = async (e) => {
        e.preventDefault()
        const user = { name, email, password }
        try {
            const response = await fetch('http://localhost:5001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            setMessage("user created successfully")
        } catch (error) {
            console.log(error)
            setMessage("Failed to create user")
        }
    }
  
    return (
        <>
            <div className="login-container">
                <div className="login-content">
                <h2>Sign Up</h2>
                <form className="signup-form" onSubmit={handleSubmitUser}>
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
                        <span>Log in</span>
                        <span>Forgot Password</span>
                    </div>
                    <div className="form-box">
                        <button type="submit">Create User</button>
                    </div>
                </form>
                <div className="response-message">
                    <p>{message}</p>
                </div>
                </div>
            </div>
        </>
    )
  }
  
  export default LoginPage