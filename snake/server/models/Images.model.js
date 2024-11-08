import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageData: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
})

const Image = mongoose.model('Image', imageSchema)

export default Image