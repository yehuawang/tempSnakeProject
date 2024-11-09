import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const profileImageSchema = new mongoose.Schema({
    mimetype: { type: String, required: true },
    data: { type: Buffer, required: true }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: profileImageSchema, default: null },
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
