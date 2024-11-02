import mongoose from 'mongoose';
import { v4 } from 'uuid';

const MessageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    isUser: { type: Boolean, required: true },
    uuid: { type: String, default: v4()}
}, {
    _id: false
});


const ConversationSchema = new mongoose.Schema({
    conversationId: { type: String, default: v4() },
    createdAt: { type: Date, default: Date.now },
    conversationTitle: { type: String, default: "New Chat..." },
    messages: { type: [MessageSchema], default: []}
}, {
    _id: false
});


const UserAiChatBoxConversationSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true },
    conversation: { type: [ConversationSchema], default: []}
}, {
    timestamps: true
});



export default mongoose.model('ConversationCollection', UserAiChatBoxConversationSchema);
