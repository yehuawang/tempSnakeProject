import React, { useState, useEffect } from 'react';

function Messages({ userEmail, updateWindow }) {
    const [messages, setMessages] = useState([]);
    const [role, setRole] = useState('model');

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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const newMessage = await response.json();
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            } catch (error) {
                console.log('Chat could not be created', error);
            }
        };

        createChat();
    }, [userEmail]);

    return (
        <div className="chat-messages">
            {messages.map((message, index) => (
                <div key={index} className={`message ${role === 'user' ? 'user-message' : 'llm-message'}`}>
                    {message.content}
                </div>
            ))}
        </div>
    );
}

export default Messages;