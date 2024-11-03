import express from "express"
import { checkRecordExist, createSnakeRecord, getSnakeRecord, updateSnakeRecord } from "../controllers/snakeScore.controller.js"

const router = express.Router()

router.post("/check", checkRecordExist)
router.post("/create", createSnakeRecord)
router.post("/get", getSnakeRecord)
router.post("/update", updateSnakeRecord)


export default router
