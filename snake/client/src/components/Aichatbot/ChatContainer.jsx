import React, { useState, useEffect } from 'react'
import '../../styles/Chatbot.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import Messages from './Messages'

function ChatContainer({ userEmail }) {
    const [inputValue, setInputValue] = useState('Ask alice...')
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
            <div className="chat-header">
                <h1>AI Chat Bot</h1>
            </div>
            <Messages 
                isUser={isUser}
                userInput={messageInput} 
                userEmail={userEmail} 
                updateWindow={isLoading} 
                onMessagesRendered={handleMessagesRender}
                />
            { isLoading && (
                <div className="loading" id="loading">
                    Alice is typing...
                </div>
            )}
            <div className="input-container">
                <input
                    id="message-input"
                    type="text"
                    placeholder="Message Alice..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required 
                />
                <button id="send-button" onClick={handleSend} disabled={isButtonDisabled}>
                    <i className="bi bi-send-fill"></i>
                </button>
            </div>
        </div>
    )
}


export default ChatContainer

