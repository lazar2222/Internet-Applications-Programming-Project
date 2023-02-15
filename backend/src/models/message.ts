import mongoose from "mongoose"

const Schema = mongoose.Schema

let message = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workshop: {
        type: Schema.Types.ObjectId,
        ref: 'Workshop',
        required: true
    },
    direction: {
        type: String,
        trim: true,
        required: true,
        enum: ['U2W','W2U']
    },
    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: [true, '|Tekst poruke je obavezan']
    }
})

export default mongoose.model('Message',message,'messages')
