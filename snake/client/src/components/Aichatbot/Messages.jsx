import React, { useState, useEffect } from 'react'
import '../../styles/Chatbot.css'

function Messages({ isUser, userInput, userEmail, updateWindow, onMessagesRendered }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const createChat = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/chat/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const newChat = await response.json()
                const newMessage = newChat.chat.messages[0]
                console.log(newMessage)
                setMessages([newMessage])
                if (onMessagesRendered) {
                    onMessagesRendered()
                }
            } catch (error) {
                console.log('Chat could not be created', error)
            }
        };

        createChat()
    }, [])


    useEffect(() => {
        const appendMessage = async() => {
            try {
                if (updateWindow === true) {
                    const response = await fetch('http://localhost:5001/api/chat/append', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userEmail,
                            inputMessage: userInput,
                            role: "user"
                        })
                    })
                    if(!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    const chat = await response.json()
                    const len = chat.chat.messages.length
                    const allMessages = chat.chat.messages
                    const newMessage = allMessages[len - 1]
                    console.log("all messages: \n", allMessages)
                    const newMessageContent = newMessage.content
                    console.log("new message content: \n", newMessageContent)
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, newMessage]
                        return updatedMessages
                    })

                    console.log("start generating ai response")

                    const aiResponse = await fetch('http://localhost:5001/api/chat/generate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userInput
                        })
                    })
                    const aiResponseText = await aiResponse.json()
                    console.log("ai response: \n", aiResponseText.responseString)
                    if (!aiResponse.ok) {
                        throw new Error(`failed generating aiResponse! HTTP error! status: ${aiResponse.status}`)
                    }

                    const AIresponse = await fetch('http://localhost:5001/api/chat/append', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userEmail,
                            inputMessage: aiResponseText.responseString,
                            role: "model"
                        })
                    })

                    if (!AIresponse.ok) {
                        throw new Error(`failed appending aiResponse to stack! HTTP error! status: ${AIresponse.status}`)
                    }
                    const AIchat = await AIresponse.json()
                    const messageToAdd = AIchat.chat.messages[len]

                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, messageToAdd]
                        return updatedMessages
                    })
                    
                    if (onMessagesRendered) {
                        onMessagesRendered()
                    }
                }
            } catch (error) {
                console.log('Message could not be appended', error)
            }
        }
        if (userInput) {
            appendMessage()
        }
    },[isUser])

    return (
        <div className="chat-messages">
            { true && messages.map((message, index) => (
                <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'llm-message'}`}>
                    {message.content}
                </div>
            ))}
        </div>
    )
}

export default Messages