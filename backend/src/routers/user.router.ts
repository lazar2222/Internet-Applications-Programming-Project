import express from 'express'
import { filterUser } from './filters'
const userRouter = express.Router()

userRouter.use(filterUser)

userRouter.route('/logout').post()
userRouter.route('/password').patch()
userRouter.route('/profile').get().post()
userRouter.route('/picture').post()
userRouter.route('/interaction').get().post().patch().delete()
userRouter.route('/message').head().get().post()

export default userRouter