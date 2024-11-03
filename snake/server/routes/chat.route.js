import express from "express"
import { generateResponse, createChat, appendMessage, getLatestMessage, getAllMessages } from "../controllers/chat.controller.js"
const router = express.Router()

const AI_KEY=process.env.AI_KEY

router.post("/generate", generateResponse)
router.post("/create", createChat)
router.post("/append", appendMessage)
router.post("/latest", getLatestMessage)
router.post("/all", getAllMessages)

export default router
