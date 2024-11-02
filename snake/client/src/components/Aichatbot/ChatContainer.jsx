import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import '../../styles/Chatbot.css'

function ChatContainer({ userEmail }) {

    
    const [messageInput, setMessageInput] = useState('')
    const [messages, setMessages] = useState([])
    const [prompt, setPrompt] = useState('')
    const [isUser, setIsUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [conversationId, setConversationId] = useState('')

    const launchConversation = async (userEmail) => {
        try {
            console.log(`try creating new conversation collection for user ${userEmail}...`)
            const conversationCollection = await fetch('http://localhost:5001/api/userAiChatBox/createNewConversationCollection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail })
            })
            const stat = conversationCollection.status
            if (stat == 404) {
                throw new Error('Failed to create conversation collection because the user is not yet in the database')
            }
            if (stat == 400) {
                console.log(`user ${userEmail} already has a conversation collection, try generating new conversation now...`)
                const newConversation = await fetch('http://localhost:5001/api/userAiChatBox/createConversation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail })
                })
                if (!newConversation.ok) {
                    throw new Error('Failed to create new conversation for some reason... debug later...')
                }
                const newConversationId = newConversation.conversationId
                console.log(`new conversation created:\n${newConversation}`)
                console.log(`fetching first message from conversation ${newConversationId}...`)
                const firstMessage = await fetch('http://localhost:5001/api/userAiChatBox/getNewestMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: userEmail, conversationId: newConversationId })
                })
                console.log(`first message fetched:${firstMessage}`)
    

                return {firstMessage, newConversationId}
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const initializer = async () => {
            const {firstMessage, conversationId} = await launchConversation(userEmail)
            setMessages([firstMessage])
            setConversationId(conversationId)
        }
        initializer()
    }, [])


    const handleSend = async (e) => {
        e.preventDefault();
        setIsUser(true)
        setPrompt(messageInput.trim());
        if (!prompt) return; // no empty messages

        setMessages([...messages, {
            content: prompt,
            isUser,
            id: v4()
        }])
        setIsUser(false)
        // setIsButtonDisabled(false);
        clearInput();
        setIsLoading(true);

        try{
            

        } catch (error) {
            console.log(error);
            setMessageInput([...messages, {
                content: 'Sorry, there was an error sending your message.', 
                isUser,
                id: v4()
            }]);
        }
    
            
    }
    
    const clearInput = () => {
        setMessageInput('');
    }
    

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Playground</h1>
            </div>
            <div className="chat-messages" id="chat-messages">
                {
                    messages.map((message) => {
                        return (
                            <div 
                                key={message.uuid}
                                className={`message ${message.isUser ? 'user-message' : 'llm-message'}`}
                            >
                                {message.content}
                            </div>
                        )
                    })
                }
            </div>
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
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    required 
                />
                <button id="send-button" onClick={handleSend} disabled={isButtonDisabled}>
                    <img src="right-arrow.png" alt="right-arrow" width="30" height="30" />
                </button>
            </div>
        </div>
    )
}



export default ChatContainer
