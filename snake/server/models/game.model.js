import mongoose from 'mongoose'


const scoreSchema = new mongoose.Schema({
    score: { type: Number, required: true, default: 0 },
    user_email: {type: String, unique: true, required: false}
})

const gameSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    body: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    instruction: { type: String, required: true },
    scores: { type:[scoreSchema], required: false, default: [] }
})


export default mongoose.model('Game', gameSchema)