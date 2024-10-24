import { useState } from 'react'

import './LoginPage.css'

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
                <form className="signup-form" onSubmit={handleSubmitUser}>
                    <div className="form-container">
                        <div className="label-group">
                            <label className="label-field" htmlFor="name-input">Name:</label>
                            <label className="label-field" htmlFor="email-input">Email:</label>
                            <label className="label-field" htmlFor="password-input">Password:</label>
                        </div>
                        <div className="input-group">
                            <input 
                                className="input-field"
                                id="name-input"
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                            <input 
                                className="input-field"
                                id="email-input"
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <input 
                                className="input-field"
                                id="password-input"
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <button type="submit">Create User</button>
                </form>
                <div className="response-message">
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
  }
  
  export default LoginPage