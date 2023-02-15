import mongoose from "mongoose"

const Schema = mongoose.Schema

let recovery = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    key: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        expires: 30 * 60
    }
})

export default mongoose.model('Recovery',recovery,'recoveries')