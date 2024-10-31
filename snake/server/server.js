import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.route.js"
import cors from "cors"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use("/api/users", userRoutes)
 

app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT)
})
