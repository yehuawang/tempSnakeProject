import express from "express"
import { createChat, appendMessage, getLatestMessage } from "../controllers/chat.controller.js"
const router = express.Router()

const AI_KEY=process.env.AI_KEY

router.post("/create", createChat)
router.post("/append", appendMessage)
router.post("/latest", getLatestMessage)

export default router
