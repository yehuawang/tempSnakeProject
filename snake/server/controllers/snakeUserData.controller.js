import SnakeUserData from "../models/snakeUserData.model.js"

/**
 * 
 * @param {*} req is the user email
 * @param {*} res 
 * @returns 0 if userdata is created successfully (initiated), -1 if already exists, -2 if internal server error.
 */

export const createSnakeUserData = async (req, res) => {
    console.log("Received CREATE request\nrequest body: ", req.body)
    const { user_email } = req.body
    try {
        const snakeUserDataAtThisEmail = await SnakeUserData.findOne({ user_email })
        if (snakeUserDataAtThisEmail) {
            return res.status(400).json({ 
                success: false,
                message: "This user already has a snake data associated with, did not create new data object",
                highestScore: -1
            })
        }
        const newSnakeUserData = await SnakeUserData.create({ user_email })
        await newSnakeUserData.save()
        res.status(201).json({
            success: true,
            message: "Snake user data associated successfully",
            highestScore: 0
        })
    } catch (error) {
        console.log("Error creating snake user data: ", error)
        res.status(500).json({
            success: false,
            message: "internal server error",
            highestScore: -2
        })
    }
}

/**
 * 
 * @param {userEmail} req String, the email of the user
 * @param {*} res
 * @returns {highestScore} the highest score of the user if found, -1 if not found, and -2 if internal server error.
 */
export const fetchSnakeUserData = async (req, res) => {
    try {
        console.log("Received FETCH request\nrequest body: ", req.body)
        const { userEmail } = req.body
        console.log("Looking for user data associated with this email...")
        const snakeUserData = await SnakeUserData.findOne({ user_email: userEmail });
        
        if (!snakeUserData) {
            console.log("User data not found at this email...")
            return res.status(404).json({
                success: false,
                message: "User not found",
                highestScore: -1
            })
        }

        console.log(`Found user data associated with this email, highest score: ${snakeUserData.highest_Score}`)
        res.status(200).json({
            success: true,
            message: `Successfully fetched highest score ${snakeUserData.highest_Score} from user ${userEmail}`,
            highestScore: snakeUserData.highest_Score
        })
    } catch (error) {
        console.log("Error fetching snake user data: ", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            highestScore: -2
        })
    }
}


/**
 * 
 * @param {userEmail, newHighestScore} req {userEmail: mongoose.Schema.Types.ObjectId, newHighestScore: Number}
 * @param {*} res 
 * @returns the new highest score of the user if updated successfully, -1 if user not found, -2 if internal server error, -3 if the new score is lower than the old highest score.
 */
export const updateSnakeUserData = async (req, res) => {
    const { userEmail, newHighestScore } = req.body
    try {
        const snakeUserData = await SnakeUserData.findOne({ user_email: userEmail })
        if (!snakeUserData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                highestScore: -1
            })
        }
        if (newHighestScore < snakeUserData.highest_Score) {
            return res.status(400).json({
                success: false,
                message: "New highest score is lower than old highest score, the highest score is NOT updated, check code logic for why calling this API when the highest score is NOT higher than what's in database",
                highestScore: -3
            })
        }
        const oldHighestScore = snakeUserData.highest_Score
        snakeUserData.highest_Score = newHighestScore
        await snakeUserData.save()

        res.status(200).json({
            success: true,
            message: `Successfully updated highest score from ${oldHighestScore} to ${newHighestScore}`,
            highestScore: newHighestScore
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            highestScore: -2
        })
    }
}
