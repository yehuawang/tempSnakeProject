import express from "express"
import {getGames, getGameScores, createGame} from "../controllers/game.controller.js"


const router = express.Router()


router.post("/getGames", getGames)
router.post("/getGameScores", getGameScores)
router.post("/createGame", createGame)


export default router