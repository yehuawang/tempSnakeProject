import express from "express"
import {getGames, getGameScores, updateUserScore, updateUserScoreLessIsBest, modifyUserScore, createGame} from "../controllers/game.controller.js"


const router = express.Router()


router.post("/getGames", getGames)
router.post("/modifyUserScore", modifyUserScore) /* this is a developer use only route to modify scores in snake database */
router.post("/getGameScores", getGameScores)
router.post("/updateUserScoreLessIsBest", updateUserScoreLessIsBest)
router.post("/updateUserScore", updateUserScore)
router.post("/createGame", createGame)


export default router