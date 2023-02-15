import mongoose from "mongoose"

const Schema = mongoose.Schema

let subscription = new Schema({
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
    type: {
        type: String,
        trim: true,
        required: true,
        enum: ['reservation','notification','participation']
    }
})

export default mongoose.model('Subscription',subscription,'subscriptions')
