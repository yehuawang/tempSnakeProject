import Chat from '../models/chat.model.js'
import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'


dotenv.config()
const API_KEY = process.env.AI_KEY

/**
 * 
 * @param {userEmail: String} req 
 * @param {*} res 
 */
export const findChat = async (req, res) => {
    const { userEmail } = req.body

    try {
        const chat = await Chat.findOne({ user_email: userEmail })
        if (!chat) {
            return res.status(200).json({ 
                chatFount: false,
                message: 'Chat not found'
            })
        }
        return res.status(200).json({
            chatFound: true,
            message: 'Chat found',
        })
    } catch (error) {
        console.error('Error finding chat:', error)
        res.status(500).json({ message: 'Chat could not be found', error: error.message })
    }
}


/**
 * 
 * @param {userInput: String} req 
 * @param {*} res 
 */
export const generateResponse = async (req, res) => {
    const { userInput } = req.body

    try {
        const genAI = new GoogleGenerativeAI(API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        const result = await model.generateContent(userInput)
        const responseText = result.response.text()
        console.log(responseText)
        res.status(200).json({
            responseString: responseText
        })
    } catch (error) {
        console.error('Error generating ai response:', error)
        res.status(200).json({
            responseString: `Sorry there was an error generating a response due to GoogleGenerativeAI internal token limits. Please try again later... Check terminal console for more information. [error: $(error.message)]`
        })
    }
}

/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 */
export const createChat = async (req, res) => {
    const { userEmail } = req.body

    if (!userEmail) {
        return res.status(400).json({ message: 'userEmail is required' });
    }

    try {
        const existingChat = await Chat.findOne({ user_email: userEmail })
        if (existingChat) {
            console.log("Existing chat found, returning this chat found")
            return res.status(200).json({
                chat: existingChat
            })
        }
        const chat = await Chat.create({ 
            user_email: userEmail,
            messages: [
                {
                    content: 'Hello, how can I help you today?',
                    role: 'model',
                }
            ]
        })
        res.status(201).json({ chat })
    } catch (error) {
        console.error('Error creating chat:', error); // Added detailed error logging
        res.status(500).json({ message: 'Chat could not be created', error: error.message })
    }

}


/**
 * 
 * @param {userEmail: String, inputMessage: String, role: ["user", "model"]} req 
 * @param {*} res 
 */
export const appendMessage = async (req, res) => {
    const { userEmail, inputMessage, role } = req.body

    try {
        const chat = await Chat.findOne({ user_email: userEmail })
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        chat.messages.push({
            content: inputMessage, 
            role: role,
        })
        await chat.save()
        console.log(`Chat successfully appended with message: ${chat.messages[chat.messages.length - 1].content}`)
        res.status(201).json({
            chat 
        })
    } catch (error) {
        console.error('Error appending message:', error); // Added detailed error logging
        res.status(500).json({ 
            message: 'Message could not be appended',
            error: error.message
        })
    }
}

/**
 * 
 * @param {userEmail: String} req 
 * @param {*} res 
 */
export const getLatestMessage = async (req, res) => {
    const { userEmail } = req.body
    
    try {
        const chat = await Chat.findOne({ user_email: userEmail })
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        const latestMessage = chat.messages[chat.messages.length - 1]

        res.status(200).json({ latestMessage })
    } catch (error) {
        console.error('Error retrieving latest message:', error); // Added detailed error logging
        res.status(500).json({ message: 'Could not retrieve latest message', error: error.message })
    }
}


/**
 * 
 * @param {userEmail: String} req 
 * @param {*} res 
 */
export const getAllMessages = async (req, res) => {
    const { userEmail } = req.body

    try {
        const chat = await Chat.findOne({ user_email: userEmail })
        res.status(200).json({ messages: chat.messages })
    } catch (error) {
        console.error('Error retrieving all messages:', error)
        res.status(500).json({ message: 'Could not retrieve all messages', error: error.message })
    }
}