import UserAttempt from '../models/userPreviousAttempts.model.js'




/**
 * 
 * @param {userEmail, gameId} req 
 * @param {*} res 
 */
export const getUserAttempts = async (req, res) => {
    const { userEmail, gameId } = req.body

    try {
        const response = await UserAttempt.findOne({
            user_email: userEmail
        })

        if (!response) {
            const newUserAttempt = new UserAttempt({
                user_email: userEmail,
                gameAttempts: [{
                    game_id: gameId,
                    attempts: []
                }]
            })
            await newUserAttempt.save()
            return res.status(200).json({
                attempts: []
            })
        }

        const gameAttempts = response.gameAttempts
        if (!gameAttempts) {
            response.gameAttempts = [{ game_id: gameId, attempts: [] }]
            await response.save()
            return res.status(200).json({
                attempts: []
            })
        }
        
        const gameAttempt = gameAttempts.find(att => att.game_id === gameId)
        if (!gameAttempt) {
            gameAttempts.push({
                game_id: gameId,
                attempts: []
            })
            await response.save()
            return res.status(200).json({
                attempts: []
            })
        }
        res.status(200).json({
            attempts: gameAttempt.attempts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving user attempts"
        })
    }
}




/**
 * 
 * @param {userEmail, gameId, score} req 
 * @param {*} res 
 */
export const addNewAttempt = async (req, res) => {
    const { userEmail, gameId, score } = req.body
    console.log("addNewAttempt being called...")

    try {
        const response = await UserAttempt.findOne({
            user_email: userEmail
        })
        const gameAttempts = response.gameAttempts
        const gameAttempt = gameAttempts.find(att => att.game_id === gameId)
        if (gameAttempt) {
            gameAttempt.attempts.push({
                score
            })
        } else {
            gameAttempts.push({
                game_id: gameId,
                attempts: [{
                    score
                }]
            })
        }
        await response.save()
        res.status(200).json({
            message: "Attempt added"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when adding new attempt"
        })
    }
}