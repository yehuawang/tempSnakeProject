import express from "express"
import { getCoinCount, updateCoinCount, getUserProfileImage, uploadProfileImage, createUser, deleteUser, getUser, updateUser, loginUser } from "../controllers/user.controller.js"
import { protectRoute } from "../middlewares/protectRoute.jwt.js"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const uploadMiddleware = upload.single('profile-image')
const router = express.Router()

router.post("/getUser", getUser)

router.post("/getCoinCount", getCoinCount)
router.post("/updateCoinCount", updateCoinCount)


// to be implemented with updating the user profile
router.post("/register", createUser)

router.put("/:id", protectRoute, updateUser)

router.delete("/:id", protectRoute, deleteUser)

router.post("/login", loginUser)

router.post("/upload-profile-image", uploadMiddleware, uploadProfileImage)
router.post("/get-profile-image", getUserProfileImage)

export default router