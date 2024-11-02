import express from "express"
import { createConversationCollection, createConversation, generateContent, getNewestMessage } from "../controllers/userAiChatBoxConversation.controller.js"

const router = express.Router()

router.post("/createNewConversationCollection", createConversationCollection)
router.post("/createConversation", createConversation)
router.post("/generateContent", generateContent)
router.post("/getNewestMessage", getNewestMessage)

export default router