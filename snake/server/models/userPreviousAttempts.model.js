import mongoose from 'mongoose'


const attemptSchema = new mongoose.Schema({
    time: { type: Date, default: () => new Date() },
    score: { type: Number, required: true, default: 0 }
})

const gameAttemptSchema = new mongoose.Schema({
    game_id: { type: String, unique: true, required: true },
    attempts: { type:[attemptSchema], required: false, default: [] }
})

gameAttemptSchema.pre('save', function(next) {
    this.attempts.sort((a, b) => a.time - b.time);
    if (this.attempts.length > 3) {
        this.attempts = this.attempts.slice(-3);
    }
    next();
});

const userAttemptSchema = new mongoose.Schema({
    user_email: { type: String, unique: true, required: true },
    gameAttempts: { type:[gameAttemptSchema], required: false, default: [] }
})


export default mongoose.model('UserAttempt', userAttemptSchema)