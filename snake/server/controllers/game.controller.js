import Game from '../models/game.model.js'
import mongoose from 'mongoose'




/**
 * 
 * @param {gameCategory: String} req either "reaction" or "memory"
 * @param {*} res 
 */
export const getGames = async (req, res) => {
    const { gameCategory } = req.body
    try {
        const response = await Game.find({category: gameCategory})
        const games = response.map(game => {
            return {
                id: game.id,
                name: game.name,
                body: game.body,
                description: game.description,
                category: game.category,
                instruction: game.instruction
            }
        })
        console.log(games)
        res.status(200).json(
            games
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving games"
        })
    }
}



/**
 * 
 * @param {gameId: String} req 
 * @param {*} res 
 */
export const getGameScores = async (req, res) => {
    const { gameId } = req.body
    try {
        const response = await Game.findOne({id: gameId})
        const scores = response.scores
        console.log(scores)
        res.status(200).json(
            scores
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving game scores"
        })
    }
}



/**
 * 
 * @param {gameId: String, gameName: String, gameBody: String, gameDescription: String, gameCategory: String, gameInstruction: String} req 
 * @param {*} res 
 */
export const createGame = async (req, res) => {
    const { gameId, gameName, gameBody, gameDescription, gameCategory, gameInstruction } = req.body
    try {
        const game = new Game({
            id: gameId,
            name: gameName,
            body: gameBody,
            description: gameDescription,
            category: gameCategory,
            instruction: gameInstruction
        })
        await game.save()
        console.log("Game created")
        res.status(201).json({
            message: "Game created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when creating game"
        })
    }
}