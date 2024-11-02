import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import '../../styles/Chatbot.css'

import Messages from './Messages'

function ChatContainer() {
    // const [messages, setMessages] = useState([])
    // const [messageInput, setMessageInput] = useState('')
    // const [isLoading, setIsLoading] = useState(false)
    // const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // const handleSend = () => {

    // }

    // const loadWelcomingMessage = () => {
        
    // }

    // return (
    //     <div className="chat-container">
    //         <div className="chat-header">
    //             <h1>Playground</h1>
    //         </div>
    //         <div className="chat-messages" id="chat-messages">
    //             {
    //                 messages.map((message) => {
    //                     return (
    //                         <div 
    //                             key={message.uuid}
    //                             className={`message ${message.isUser ? 'user-message' : 'llm-message'}`}
    //                         >
    //                             {message.content}
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </div>
    //         { isLoading && (
    //             <div className="loading" id="loading">
    //                 Alice is typing...
    //             </div>
    //         )}
    //         <div className="input-container">
    //             <input
    //                 id="message-input"
    //                 type="text"
    //                 placeholder="Message Alice..." 
    //                 value={messageInput}
    //                 onChange={(e) => setMessageInput(e.target.value)}
    //                 required 
    //             />
    //             <button id="send-button" onClick={handleSend} disabled={isButtonDisabled}>
    //                 <img src="right-arrow.png" alt="right-arrow" width="30" height="30" />
    //             </button>
    //         </div>
    //     </div>
    // )
    return (
      <div>
        <h1> old container to be deleted </h1>
      </div>
    )
}


export default ChatContainer

