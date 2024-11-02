import React from 'react'

function ChatContainer() {
    const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const loadingIndicator = document.getElementById('loading');

// Message handling functions
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'llm-message'}`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function clearInput() {
    messageInput.value = '';
}

function toggleLoading(show) {
    loadingIndicator.style.display = show ? 'block' : 'none';
}

// Event Listeners
sendButton.addEventListener('click', handleSend);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// Handle sending messages
async function handleSend() {
    const prompt = messageInput.value.trim();
    if (!prompt) return; // no empty messages
    sendButton.disabled = true;
    addMessage(prompt, true);
    clearInput();
    toggleLoading(true);
    try {
        const API_KEY = await (await fetch("API_KEY")).text();
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Please provide an concise response for ${prompt}, referencing emoji if applicable. Don't show the prompt`);
        addMessage(result.response.text());
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, there was an error sending your message.');
    }
    toggleLoading(false);
    sendButton.disabled = false;
}
document.addEventListener('DOMContentLoaded', () => {
    addMessage("Hello! I'm Alice. How can I help you today?");
});
  return (
      <div class="chat-container">
          <div class="chat-header">
              <h1>Playground</h1>
          </div>
          <div class="chat-messages" id="chat-messages">
          </div>
          <div class="loading" id="loading">
              Alice is typing...
          </div>
          <div class="input-container">
          <input
                    id="message-input"
                    type="text"
                    placeholder="Message Alice..." 
                    value={email} 
                    required 
            />
              <input type="text" id="message-input" placeholder="Message Alice...">
                  <button id="send-button"><img src="right-arrow.png" alt="right-arrow" width="30" height="30"></button>
          </div>
      </div>
  )
}

export default ChatContainer
