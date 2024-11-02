import Chat from '../models/chat.model.js'


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