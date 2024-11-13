import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import snakeUserDataRoutes from "./routes/snakeUserData.route.js"
import chatRoutes from "./routes/chat.route.js"
import snakeScoreRoutes from "./routes/snakeScore.route.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use("/api/users", userRoutes)
app.use("/api/snakeUserData", snakeUserDataRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/snake/score", snakeScoreRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT)
})