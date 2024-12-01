import express from "express"
import {
    getUserAttempts, addNewAttempt
} from "../controllers/userPreviousAttempts.controller.js"


const router = express.Router()

router.post("/getUserAttempts", getUserAttempts)
router.post("/addNewAttempt", addNewAttempt)

export default router