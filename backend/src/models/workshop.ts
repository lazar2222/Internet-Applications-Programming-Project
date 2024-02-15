import mongoose from 'mongoose'
import { ArrayValidator, fileValidator, mandatoryFileValidator } from './validators'

const Schema = mongoose.Schema

let workshop = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, '|Naziv je obavezan']
    },
    titlePicture: {
        type: String,
        trim: true,
        validate: [mandatoryFileValidator('workshop'), '|Slika nije validan fajl']
    },
    date: {
        type: Date,
        required: [true, '|Datum je obavezan']
    },
    location: 
    {
        type: String,
        trim: true,
        required: [true, '|Mesto je obavezno']
    },
    shortDesc: {
        type: String,
        trim: true,
        required: [true, '|Kratak opis je obavezan']
    },
    longDesc: {
        type: String,
        trim: true,
        required: [true, '|Dugacak opis je obavezan']
    },
    gallery: {
        type: [String],
        trim: true,
        validate: [ArrayValidator(fileValidator('workshop'),5), '|Galerija slika nije validna']
    },
    totalSpaces: {
        type: Number,
        min: [1, '|Radionica mora imati bar jedno mesto'],
        required: [true, '|Broj mesta je obavezan']
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true,
        enum: {values: ['active','inactive','pending'], message: '|Status nije validan'}
    }
})

export default mongoose.model('Workshop',workshop,'workshops')
