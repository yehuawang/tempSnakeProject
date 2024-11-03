import mongoose from 'mongoose'
import { v4 } from 'uuid'

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    role: { type: String, required: true },
    message_id: { type: String, default: v4 }
}, {
    _id: false
})

const chatSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true },
    messages: [messageSchema]
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema);
export default Chat