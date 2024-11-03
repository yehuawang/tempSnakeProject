import mongoose from 'mongoose'

const snakeScoreSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true},
    highest_Score: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
})



const SnakeScore = mongoose.model('SnakeScore', snakeScoreSchema);
export default SnakeScore