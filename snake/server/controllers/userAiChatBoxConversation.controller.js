import dotenv from "dotenv"
import ConversationCollection from "../models/userAiChatBoxConversation.model.js"
import User from "../models/user.model.js"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 } from "uuid"

dotenv.config()
const API_KEY=process.env.AI_KEY

/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 * @returns the entire user conversation collection in res.data
 */
export const createConversationCollection = async (req, res) => {
    const { userEmail } = req.body
    const user = await User.findOne({ email: userEmail })
    if (!user) {
        return res.status(404).json(
            {
                success: false,
                message: "User Email does not exist in database"
            }
        )
    }
    const conversationsUnderThisUser = await ConversationCollection.findOne({ user_email: userEmail})
    if (conversationsUnderThisUser) {
        return res.status(400).json({
            success: false,
            message: "Conversation already exists for this user, new conversation collection is not created, each user only have one conversation collection"
        })
    }
    try {
        const newConversationCollection = await ConversationCollection.create({ 
            user_email: userEmail,
            conversation: {
                conversationTitle: "Hello...",
                messages: [
                    {
                        content: "Hello!",
                        isUser: false,
                    }
                ]
            }
        })
        await newConversationCollection.save()
        res.status(201).json({
            success: true,
            data: newConversationCollection,
            message: "Conversation collection is successfully created, check the res.data for the conversation details including uuid generated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 * @returns {conversationId} the uuid of the new conversation generated
 */
export const createConversation = async (req, res) => {
    const { userEmail } = req.body
    try {
        const user = await findUserByEmail(userEmail)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Email does not exist in database"
            })
        }
        const conversationCollection = await ConversationCollection.findOne({ user_email : userEmail })
        if (!conversationCollection) {
            return res.status(404).json({
                success: false,
                message: "Conversation collection for the provided user email is not found, please create a conversation collection for this user first"
            })
        }

        const newConversation = {
            conversationTitle: "New Conversation...",
            conversationId: v4(),
            messages: [
                {
                    content: "Hello!",
                    isUser: false,
                    uuid: v4()
                }
            ]
        }

        if (!Array.isArray(conversationCollection.conversation)) {
            conversationCollection.conversation = []
        }
        
        conversationCollection.conversation.push(newConversation)
        await conversationCollection.save()

        res.status(201).json({
            success: true,
            conversationId: newConversation.conversationId,
            message: "Conversation is successfully created, check the res.conversationId for the conversation"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Other unknown error haven't been categorized yet..."
        })
    }
}


/**
 * 
 * @param {userEmail, conversationId} req 
 * @param {*} res 
 * @returns {responseId} the uuid of the new response generated inside messages array
 */
export const generateContent = async (req, res) => {
    const { userEmail, conversationId } = req.body
    try {
        if (!findUserByEmail(userEmail)) {
            return res.status(404).json({
                success: false,
                message: "User Email does not exist in database"
            })
        }

        const conversationCollection = findConversationCollectionByUserEmail(userEmail)
        if (!conversationCollection) {
            return res.status(404).json({
                success: false,
                message: "Conversation collection for the provided user email is not found"
            })
        }
        const conversation = findConversationByConversationId(conversationId, conversationCollection)

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation at the provided conversation id is not found"
            })
        }

        if (!API_KEY) {
            return res.status(500).json({
                success: false,
                message: "failed to fetch API_KEY"
            })
        }

        const genAI = new GoogleGenerativeAI(API_KEY)

        if (!genAI) {
            return res.status(500).json({
                success: false,
                message: "failed to create google generative AI instance"
            })
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        if (!model) {
            return res.status(500).json({
                success: false,
                message: "failed to get model from genAI"
            })
        }

        const result = await model.generateContent(`Please provide an concise response for ${prompt}, referencing emoji if applicable. Don't show the prompt`)

        conversation.messages.push({
            content: result,
            isUser: false
        })
        const resultId = conversation.messages[conversation.totalNumberOfMessages-1].uuid

        res.status(200).json({
            success: true,
            resultId,
            message: "Response is successfully generated and pushed to conversation list, check the res.resultId to retrieve the response by uuid"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Other unknown error haven't been categorized yet..."
        })
    }
}


/**
 * 
 * @param {userEmail, conversationId} req 
 * @param {*} res 
 */
export const getNewestMessage = async (req, res) => {
    const { userEmail, conversationId } = req.body
    try {
        if (!findConversationCollectionByUserEmail(userEmail)) {
            return res.status(404).json({
                success: false,
                message: "Conversation collection for the provided user email is not found"
            })
        }
        if (!findConversationByConversationId(conversationId)) {
            return res.status(404).json({
                success: false,
                message: "Conversation at the provided conversation id is not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Other unknown error haven't been categorized yet..."
        })
    }
}


/**
 * 
 * @param { userEmail, conversationId } req 
 * @param {*} res 
 * @returns {messages} all messages in the conversation as an array
 */
export const getAllMessagesInConversation = async (req, res) => {
    const { userEmail, conversationId } = req.body
    try {
        const collection = findConversationCollectionByUserEmail(userEmail)
        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Conversation collection for the provided user email is not found"
            })
        }
        const conversation = findConversationByConversationId(conversationId, collection)
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation at the provided conversation id is not found"
            })
        }
        const messages = fetchAllMessagesInConversation(conversationId)
        res.status(200).json({
            success: true,
            data: messages,
            message: "All messages in the conversation is successfully fetched"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Other unknown error haven't been categorized yet..."
        })
    }
}

/**
 * 
 * @param {userEmail, conversationId} req 
 * @param {*} res 
 * @returns {message} a message Object that contains `content`, `isUser` and `uuid`
 */
export const getLatestMessageInConversation = async (req, res) => {
    const { userEmail, conversationId } = req.body
    try {
        const collection = findConversationCollectionByUserEmail(userEmail)
        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Conversation collection for the provided user email is not found"
            })
        }
        const message = fetchNewestMessageInConversation(conversationId, collection)
        res.status(200).json({
            success: true,
            data: message,
            message: `the latest message ${message.content} is successfully fetched from conversation id: ${conversationId} initiated by user at email: ${userEmail}`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Other unknown error haven't been categorized yet..."
        })
    }
}

const findUserByEmail = (userEmail) => {
    const user = User.findOne({ email: userEmail })
    if (!user) {
        return
    } 
    return user
}

const findConversationCollectionByUserEmail = async (userEmail) => {
    return await ConversationCollection.findOne({ user_email: userEmail })
}

const findConversationByConversationId = (conversationId, Collection) => {
    const conversation = Collection.findOne({ conversationId: conversationId })
    if (!conversation) {
        return
    }
    return conversation
}

const fetchAllMessagesInConversation = (conversationId, Collection) => {
    return Collection.findOne({ conversationId: conversationId }).messages
}


const fetchNewestMessageInConversation = (conversationId, Collection) => {
    const messages = fetchAllMessagesInConversation(conversationId, Collection).messages
    const message = messages[messages.length-1]
    return message
}