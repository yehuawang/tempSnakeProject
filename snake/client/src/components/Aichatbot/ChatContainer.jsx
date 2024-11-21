import React, { useState, useEffect } from 'react'
import '../../styles/Chatbot.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Spinner } from 'react-bootstrap'

import Messages from './Messages'

function ChatContainer({ userEmail }) {
    const [inputValue, setInputValue] = useState('')
    const [messageInput, setMessageInput] = useState('default user input')
    const [isLoading, setIsLoading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [isUser, setIsUser] = useState(false)

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            setIsUser(true)
            setMessageInput(inputValue)
            setInputValue('')
            setIsLoading(true)
            setIsButtonDisabled(true)
        }
    }

    const handleMessagesRender = () => {
        setIsUser(false)
        setIsLoading(false)
        setIsButtonDisabled(false)
    }


    return (
        <div className="chat-container">
            <Messages 
                isUser={isUser}
                userInput={messageInput} 
                userEmail={userEmail} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                onMessagesRendered={handleMessagesRender}
            />
            <div className="input-container">
                <input
                    id="message-input"
                    type="text"
                    placeholder="Message Alice..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required 
                    />
                    {/* { isButtonDisabled ? (
                        <Spinner animation="border" role="status" variant="primary">
                            <span className={`visually-hidden`}>Loading...</span>
                        </Spinner>
                    ) : null } */}
                <button id="send-button" onClick={handleSend} disabled={isButtonDisabled}>
                    <i className="bi bi-send-fill"></i> 
                </button>
            </div>
        </div>
    )
}


export default ChatContainer
