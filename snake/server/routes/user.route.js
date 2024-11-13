import express from "express"
import { getCoinCount, updateCoinCount, createUser, deleteUser, getUser, updateUser, loginUser } from "../controllers/user.controller.js"
import { protectRoute } from "../middlewares/protectRoute.jwt.js"

const router = express.Router()

router.post("/getUser", getUser)

router.post("/getCoinCount", getCoinCount)
router.post("/updateCoinCount", updateCoinCount)


// to be implemented with updating the user profile
router.post("/register", createUser)

router.put("/:id", protectRoute, updateUser)

router.delete("/:id", protectRoute, deleteUser)

router.post("/login", loginUser)

export default router
