 import mongoose from 'mongoose'

const snakeUserDataSchema = new mongoose.Schema({
    user_email: { type: String, required: true, unique: true},
    highest_Score: { type: Number, default: 0}
}, {
    timestamps: true
})



const SnakeUserData = mongoose.model('SnakeUserData', snakeUserDataSchema);
export default SnakeUserData