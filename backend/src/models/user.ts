import mongoose from 'mongoose'
import { fileValidator } from './validators'

const Schema = mongoose.Schema

let address = new Schema({
        country: {
            type: String,
            trim: true,
            required: [true, '|Drzava je obavezna']
        },
        city: {
            type: String,
            trim: true,
            required: [true, '|Grad je obavezan']
        },
        zip: {
            type: String,
            trim: true,
            required: [true, '|Postanski broj je obavezan'],
            match: [/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/, '|Postanski broj nije u validnom formatu']
        },
        street: {
            type :String,
            trim: true,
            required: [true, '|Ulica je obavezna'],
        },
        number: {
            type: String,
            trim: true,
            required: [true, '|Broj je obavezan']
        }
    })

let user = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, '|Ime je obavezno']
        
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, '|Prezime je obavezno']
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, '|Korisnicko ime je obavezno']
    },
    password: {
        type: String,
        required: [true, '|Lozinka je obavezna'],
        match: [/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])[a-zA-Z].{7,15}$/, '|Lozinka nije u validnom formatu']
    },
    phone: {
        type: String,
        trim: true,
        required: [true, '|Broj telefona je obavezan'],
        match: [/^(\+381|0)\d{2}\d{6,7}$/, '|Broj telefona nije u validnom formatu']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, '|E-mail adresa je obavezna'],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '|E-mail nije u validnom formatu']
    },
    role: {
        type: String,
        trim: true,
        required: true,
        enum: ['participant','organizer','admin']
    },
    orgName: {
        type: String,
        trim: true
    },
    address: {
        type: address
    },
    orgId: {
        type: Number
    },
    picture: {
        type: String,
        trim: true,
        validate: [fileValidator('profile'), '|Slika nije validan fajl']
    },
    status: {
        type: String,
        trim: true,
        required: true,
        enum: ['active','inactive','pending']
    }
})

export default mongoose.model('User',user,'users')
