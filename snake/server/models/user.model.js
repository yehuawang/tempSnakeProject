import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const themeSchema = new mongoose.Schema({
    theme_name: { type: String, required: true },
    price: { type: Number, required: true },
    purchased: { type: Boolean, default: false },
    text: { type: String, default: '' }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String, default: null },
    coins: { type: Number, default: 0 },
    about_me: { type: String, default: 'Tell people something about yourself!' },
    theme_list: { type: [themeSchema], default: [
        { theme_name: 'whales', price: 30, purchased: false, text: "A serene blue sky stretches above the majestic, towering mountains, their peaks softly kissed by the light of dawn." },
        { theme_name: 'jelly-fish', price: 30, purchased: false, text: "Graceful pink and purple jellyfish drift through the sky, their tendrils swirling like delicate, ethereal ribbons in the breeze." },
        { theme_name: 'caramel', price: 30, purchased: false, text: "Bask under a sky brushed with warm amber hues, where the sunlight melts gently over the rugged peaks." }
    ] },
    theme: { type: String, default: '' },
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