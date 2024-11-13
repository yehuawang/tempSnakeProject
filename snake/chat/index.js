// import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"
// const messageInput = document.getElementById('message-input');
// const sendButton = document.getElementById('send-button');
// const chatMessages = document.getElementById('chat-messages');
// const loadingIndicator = document.getElementById('loading');
// Please provide an concise response for ${prompt}, referencing emoji if applicable. Don't show the prompt
// // Message handling functions
// function addMessage(content, isUser = false) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${isUser ? 'user-message' : 'llm-message'}`;
//     messageDiv.textContent = content;
//     chatMessages.appendChild(messageDiv);
//     // Scroll to bottom
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function clearInput() {
//     messageInput.value = '';
// }

// function toggleLoading(show) {
//     loadingIndicator.style.display = show ? 'block' : 'none';
// }

// // Event Listeners
// sendButton.addEventListener('click', handleSend);
// messageInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         handleSend();
//     }
// });

// // Handle sending messages
// async function handleSend() {
//     const prompt = messageInput.value.trim();
//     if (!prompt) return; // no empty messages
//     addMessage(prompt, true);
//     clearInput();
//     toggleLoading(true);
    
//     try {
//         const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         // const prompt = "Why is AI important?.";
//         const result = await model.generateContent(prompt);
//         addMessage(result.response.text());
//     } catch (error) {
//         console.error('Error:', error);
//         addMessage('Sorry, there was an error sending your message.');
//         toggleLoading(false);
//     }
// }

// // Add a welcome message
// document.addEventListener('DOMContentLoaded', () => {
//     addMessage("Hello! I'm Alice. How can I help you today?");
// });