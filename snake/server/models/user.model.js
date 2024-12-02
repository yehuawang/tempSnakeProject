import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String, default: null },
    coins: { type: Number, default: 0 },
    about_me: { type: String, default: 'Tell people something about yourself!' },
    purchased_theme_list: { type: [String], default: ['default'] },
    selected_theme: { type: String, default: 'default' }
}, {
    timestamps: true
})

// password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// verify hash matches
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model('User', userSchema);
export default User