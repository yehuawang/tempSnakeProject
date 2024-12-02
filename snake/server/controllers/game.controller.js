import Game from '../models/game.model.js'
import { addNewAttempt } from './userPreviousAttempts.controller.js'



/**
 * 
 * @param {userEmail, gameId, highest: true / false} req //if highest === true, return top 3 highest scores, if highest === false, return top 3 lowest scores
 * @param {topThreeScores, usersAhead} res returns how many users are ahead of the current user
 */
export const getGameTopThreeScoresAndUserPosition = async (req, res) => {
    const { userEmail, gameId, highest } = req.body

    try {
        const response = await Game.findOne({ id:gameId })
        const scores = response.scores
        if (highest) {
            scores.sort((a, b) => b.score - a.score)
        } else {
            scores.sort((a, b) => a.score - b.score)
        }
        scores.map((score, index) => {
            if (score.user_email === userEmail) {
                res.status(200).json({
                    topThreeScores: scores.slice(0, 3),
                    usersAhead: index
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving top three scores and user position"
        })
    }
}

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
 * @param {gameId: String, userEmail: String, userScore} req 
 * @param {*} res 
 */
export const updateUserScore = async (req, res) => {
    const { gameId, userEmail, userScore } = req.body
    try {
        const response = await Game.findOne({
            id: gameId
        })
        const scores = response.scores
        const scoreResponse = scores.find(score => score.user_email === userEmail)
        if (scoreResponse) {
            const oldScore = scoreResponse.score
            if (userScore > oldScore) {
                scoreResponse.score = userScore
                await response.save()
                console.log("game controller calling addNewAttempt...")
                await addNewAttempt(req, res)
                return res.status(200).json({
                    message: "Score updated"
                })
            }
            return res.status(200).json({
                message: "Score not updated as it is not higher than the old score"
            })
        } else {
            scores.push({
                score: userScore,
                user_email: userEmail
            })
            await response.save()
            console.log("game controller calling addNewAttempt...")
            await addNewAttempt(req, res)
            return res.status(201).json({
                message: "Score record for new user created"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error when updating user score"
        })
    }
}

/**
 * 
 * @param {gameId: String, userEmail: String, userScore} req 
 * @param {*} res 
 */
export const updateUserScoreLessIsBest = async (req, res) => {
    const { gameId, userEmail, userScore } = req.body
    try {
        const response = await Game.findOne({
            id: gameId
        })
        const scores = response.scores
        const scoreResponse = scores.find(score => score.user_email === userEmail)
        if (scoreResponse) {
            const oldScore = scoreResponse.score
            if (userScore < oldScore) {
                scoreResponse.score = userScore
                await response.save()
                console.log("game controller calling addNewAttempt...")
                await addNewAttempt(req, res)
                return res.status(200).json({
                    message: "Score updated"
                })
            }
            return res.status(200).json({
                message: "Score not updated as it is not lower than the old score"
            })
        } else {
            scores.push({
                score: userScore,
                user_email: userEmail
            })
            await response.save()
            console.log("game controller calling addNewAttempt...")
            await addNewAttempt(req, res)
            return res.status(201).json({
                message: "Score record for new user created"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error when updating user score"
        })
    }
}

/** developer use only! */
export const modifyUserScore = async (req, res) => {
    const { id } = req.body
    try {
        const response = await Game.findOne({
            id: id
        })
        const scores = response.scores
        scores.forEach(score => {
                if (score.score > 30) {
                    score.score = Math.floor(Math.random() * 45)
                }
            }
        )
        await response.save()
        console.log("removed negative snake scores")
        res.status(200).json({
            message: "User scores modified"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when modifying user scores"
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