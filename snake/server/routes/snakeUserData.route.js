import express from "express"
import { createSnakeUserData, fetchSnakeUserData, updateSnakeUserData } from "../controllers/snakeUserData.controller.js"

const router = express.Router()


router.post("/create", createSnakeUserData)
router.post("/fetch", fetchSnakeUserData)
router.put("/update", updateSnakeUserData)

export default router
