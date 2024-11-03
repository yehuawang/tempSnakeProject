import SnakeScore from "../models/snakeScore.model.js"


/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 * @returns true if record exist, false if record does not exist
 */
export const checkRecordExist = async (req, res) => {
    const { userEmail } = req.body
    try {
        const record = await SnakeScore.findOne({ user_email: userEmail })
        if (record) {
            console.log(`Record found for user ${userEmail}`)
            return res.status(200).json({ recordFound: true })
        }
        console.log(`No record found for user ${userEmail}`)
        return res.status(200).json({ recordFound: false })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 */
export const createSnakeRecord = async (req, res) => {
    const { userEmail } = req.body
    try {
        const record = await SnakeScore.findOne({ user_email: userEmail })
        if (record) {
            console.log("record already exist!")
        }
        console.log(`No record found, creating new record for user ${userEmail}...`)
        const newRecord = await SnakeScore.create({ user_email: userEmail, highest_Score: 0 })
        await newRecord.save()
        console.log(`New record created for user ${userEmail}, returning ${newRecord}`)
        res.status(201).json({ newRecord })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 */
export const getSnakeRecord = async (req, res) => {
    const { userEmail } = req.body
    try {
        const record = await SnakeScore.findOne({ user_email: userEmail })
        // if (record) {
        //     console.log(record)
        //     const recordScore = record.highest_Score
        //     console.log(`existing record found, record found is: ${record}, record score is: ${recordScore}`)
        //     return res.status(200).json({ highestScore: recordScore })
        // }
        // console.log(`No record found, creating new record for user ${userEmail}...`)
        // const newRecord = await SnakeScore.create({ user_email: userEmail, highest_Score: 0 })
        // await newRecord.save()
        // console.log(`New record created for user ${userEmail}, returning ${newRecord}`)
        // res.status(201).json({ newRecord })
        res.status(200).json({ record })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


/**
 * 
 * @param {userEmail, newHighScore} req 
 * @param {*} res 
 */
export const updateSnakeRecord = async (req, res) => {
    const { userEmail, newHighScore } = req.body
    try {
        const record = await SnakeScore.findOne({ user_email: userEmail })
        if (!record) {
            console.log(`No record found for user ${userEmail}`)
            return res.status(404).json({ message: "Record not found" })
        }
        console.log(`Updating record for user ${userEmail}...`)
        console.log(record)
        console.log(record.highest_Score)
        console.log(newHighScore)
        record.highest_Score = newHighScore
        await record.save()
        console.log(`Record updated, new record is set to: ${record.highest_Score}`)
        res.status(200).json({ record })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
