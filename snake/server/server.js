import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cors from "cors"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import snakeScoreRoutes from "./routes/snakeScore.route.js"
import gameRoutes from "./routes/game.route.js"
import path from "path"
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/snake/score", snakeScoreRoutes)
app.use("/api/games", gameRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT)
})