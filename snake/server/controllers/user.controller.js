import User from "../models/user.model.js"
import mongoose from "mongoose"
import { genToken } from "../utils/genToken.jwt.js"



/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 */
export const getUserThemeList = async (req, res) => {
    const { userEmail } = req.body
    try {
        const user = await User.findOne({ email: userEmail })
        res.status(200).json({ theme_list: user.theme_list })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving user theme list"
        })
    }
}

/**
 * 
 * @param {userEmail} req 
 * @param {*} res 
 */
export const getUserBackgroundTheme = async (req, res) => {
    const { userEmail } = req.body
    try {
        const user = await User.findOne({ email: userEmail })
        res.status(200).json({
            theme: user.theme
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when retrieving user background theme"
        })
    }
}


/**
 * 
 * @param {userEmail: String, theme: String} req 
 * @param {*} res 
 */
export const setUserBackgroundTheme = async (req, res) => {
    const { userEmail, theme } = req.body
    try {
        if (!theme) {
            return res.status(400).json({
                message: "empty theme string, db is not updated"
            })
        }
        const user = await User.findOne({ email: userEmail })
        const theme_list = await user.theme_list.json()

        theme_list.forEach((themeItem) => {
            console.log(`theme_name: ${themeItem.theme_name}, purchased: ${themeItem.purchased}`)
            if (themeItem.theme_name === theme && themeItem.purchased === true) {
                if (themeItem.purchased === true) {
                    user.theme = theme
                    user.save()
                    return res.status(200).json({
                        message: "User background theme updated successfully"
                    })
                } else {
                    return res.status(400).json({
                        message: "User has not yet purchased this theme"
                    })
                }
            }
        })
        
        res.status(404).json({
            message: "User theme not found in record"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error when updating user background theme"
        })
    }
}


/**
 * 
 * @param {userEmail: String, theme: String} req 
 * @param {*} res 
 */
export const purchaseTheme = async (req, res) => {
    const { userEmail, theme } = req.body
    console.log(`userEmail: ${userEmail}, theme: ${theme}`)
    try {
        const user = await User.findOne({ email: userEmail })
        const coinCount = user.coins
        const theme_list = user.theme_list

        const theme_item = theme_list.find((themeItem) => themeItem.theme_name === theme) 

        if (!theme_item) {
            res.status(404).json({
                message: "User theme not found in record"
            })
        }

        if (theme_item.purchased) {
            return res.status(400).json({
                message: "User has already purchased this theme"
            })
        }

        if (user.coins < theme_item.price) {
            return res.status(400).json({
                message: "User does not have enough coins to purchase this theme"
            })
        }

        user.coins -= theme_item.price
        theme_item.purchased = true
        await user.save()

        return res.status(200).json({
            message: "Theme purchased successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error purchasing theme"
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









/**
 * 
 * @param { userEmail } req.body
 * @param { image_file } req.file
 * @param {*} res 
 */
export const uploadProfileImage = async (req, res) => {
    console.log("req.file of calling uploadProfileImage", req.file)
    const profileImageName = req.file.filename
    const { userEmail } = req.body

    try {
        const user = await User.findOne({ email: userEmail })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.profile_image = profileImageName
        await user.save()

        res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            profileImageName
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

        res.status(200).json({
            profileImage
        })
    } catch (error) {   
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
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