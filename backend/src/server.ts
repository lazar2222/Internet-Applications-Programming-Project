import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'

import identityRouter from './routers/identity.router'
import publicRouter from './routers/public.router'
import userRouter from './routers/user.router'
import workshopRouter from './routers/worshop.router'
import organizerRouter from './routers/organizer.router'
import adminRouter from './routers/admin.router'

import user from './models/user'
import recovery from './models/recovery'
import workshop from './models/workshop'
import interaction from './models/interaction'
import subscription from './models/subscription'
import message from './models/message'



const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(session({secret: "537295372953729", resave: true, saveUninitialized: true}))

mongoose.connect('mongodb://127.0.0.1:27017/piaproj')
const connection = mongoose.connection
connection.once('open', () => {
    console.log('db connection ok')
})

user.find()
recovery.find()
workshop.find()
interaction.find()
subscription.find()
message.find()

const router = express.Router()

router.use('/identity',identityRouter)
router.use('/public',publicRouter)
router.use('/user',userRouter)
router.use('/workshop',workshopRouter)
router.use('/organizer',organizerRouter)
router.use('/admin',adminRouter)


app.use('/', router)

app.listen(4000, () => console.log(`Express server running on port 4000`))