import express from "express"
import {            
            getUserAboutMe,
            updateUserAboutMe,
            getUserThemeList,
            getUserBackgroundTheme,
            setUserBackgroundTheme,
            purchaseTheme,
            getCoinCount, 
            updateCoinCount, 
            getUserProfileImage, 
            uploadProfileImage, 
            createUser, 
            deleteUser, 
            getUser, 
            updateUser, 
            loginUser
    } from "../controllers/user.controller.js"
import { protectRoute } from "../middlewares/protectRoute.jwt.js"
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        cb(null, "profile-img-" + Date.now() + "." + ext)
    }
})
const upload = multer({ storage: storage })

const router = express.Router()


/* --- ABOUT ME --- */

router.post("/getUserAboutMe", getUserAboutMe)
router.post("/updateUserAboutMe", updateUserAboutMe)

/* --- THEMES --- */
router.post("/getUserThemeList", getUserThemeList)
router.post("/getUserBackgroundTheme", getUserBackgroundTheme)
router.post("/setUserBackgroundTheme", setUserBackgroundTheme)
router.post("/purchaseTheme", purchaseTheme)


router.post("/getUser", getUser)

router.post("/getCoinCount", getCoinCount)
router.post("/updateCoinCount", updateCoinCount)

// to be implemented with updating the user profile
router.post("/register", createUser)

router.put("/:id", protectRoute, updateUser)

router.delete("/:id", protectRoute, deleteUser)

router.post("/login", loginUser)

router.post("/upload-profile-image", upload.single("image"), uploadProfileImage)

router.post("/get-profile-image", getUserProfileImage)

export default router