import User from "../models/user.model.js"
import mongoose from "mongoose"
import { genToken } from "../utils/genToken.jwt.js"
import { verToken } from "../utils/verToken.jwt.js"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


/**
 * 
 * @param {userEmail, mimeType, buffer} req 
 * @param {*} res 
 */
export const uploadProfileImage = async (req, res) => {
    try {
        const { userEmail, mimetype, buffer } = req.body
        const base64 = buffer.toString('base64')

        const newProfileImage = {
            mimetype: mimetype,
            data: base64
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { profile_image: newProfileImage },
            { new: true }
        )

        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile image successfully uploaded to database"
        })

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
export const getUserProfileImage = async (req, res) => {
    const { userEmail } = req.body

    try {
        const user = await User.findOne({ email: userEmail })
        const profileImage = user.profile_image

        if (!profileImage) {
            return res.status(404).json({
                success: false,
                message: "User has no profile image set"
            })
        }

        res.status(200).json({profileImage})
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
export const getCoinCount = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const email = userEmail.value || userEmail
        const user = await User.findOne({ email })
        res.status(200).json({
            coinCount: user.coins
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving user coin count"
        })
    }
}



/**
 * 
 * @param {userEmail, deltaCoinCount} req 
 * @param {*} res 
 */
export const updateCoinCount = async (req, res) => {
    const { userEmail, deltaCoinCount } = req.body
    try {
        const user = await User.findOne({ email: userEmail })
        user.coins += deltaCoinCount
        await user.save()
        res.status(200).json({
            newCoinCount: user.coins
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when updating user coin count"
        })
    }
}


export const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not found"
    })
  }
}

export const createUser = async (req, res) => {
  const user = req.body

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ message: "Please fill in all required fields" })
  }

  try{

    const userAtThisEmail = await User.findOne({ email: user.email })
    if (userAtThisEmail) {
      return res.status(400).json({ message: "User already exists" })
    }
    
    const newUser = await User.create(user)
    await newUser.save()
    const token = genToken(newUser._id)
    res.status(201).json({ 
        success: true, 
        data: {
            token,
            user: newUser
        }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


export const loginUser = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields"
        })
    }

    try {
        const user = await User.findOne({
            email: req.body.email
        })

        const passwordIsMatched = await user.matchPassword(req.body.password)

        if (!user || !passwordIsMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        } else {
            const token = genToken(user._id)
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    token,
                    user
                }
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const updateUser = async (req, res) => {
  // to be implemented with updating the user profile
}

export const deleteUser = async (req, res) => {
    const id = req.params
    console.log("id:", id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid user ID"
        })
        }
        try{
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "User is successfully deleted"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}