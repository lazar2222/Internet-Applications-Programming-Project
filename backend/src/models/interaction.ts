import mongoose from 'mongoose'

const Schema = mongoose.Schema

let interaction = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workshop: {
        type: String,
        trim: true,
        required: true
    },
    comment: {
        type: String,
        trim: true
    },
    date:{
      type: Date
    }
})

export default mongoose.model('Interaction',interaction,'interactions')
