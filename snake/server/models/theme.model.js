import mongoose from 'mongoose'


const themeColorsSchema = new mongoose.Schema({
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    accent: { type: String, required: true }
})

const themeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    colors: { type: themeColorsSchema, required: true },
    price: { type: Number, required: true }
})

export default mongoose.model('Theme', themeSchema)