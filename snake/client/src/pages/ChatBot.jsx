import React from 'react'
import ChatContainer from '../components/Aichatbot/ChatContainer'

function ChatBot() {
  return (
    <div>
        <h1>ChatBot</h1>
        <ChatContainer userEmail="Leslie@example.com" />
    </div>
  )
}

export default ChatBot