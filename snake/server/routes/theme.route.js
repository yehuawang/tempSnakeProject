import express from "express"
import { getAllThemes, getTheme, addTheme } from "../controllers/theme.controller.js"

const router = express.Router()

router.get("/getAllThemes", getAllThemes)
router.post("/getTheme", getTheme)
router.post("/addTheme", addTheme)

export default router
