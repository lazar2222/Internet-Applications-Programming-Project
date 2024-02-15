import express from 'express'
import { profileUpload } from '../controllers/uploader'
import { userController } from '../controllers/user.controller'
import { filterUser } from './filters'
const userRouter = express.Router()

userRouter.use(filterUser)

userRouter.route('/logout').post(userController.postLogout)
userRouter.route('/password').patch(userController.patchPassword)
userRouter.route('/profile').get(userController.getMyProfile()).post(userController.postProfile)
userRouter.route('/picture').post(profileUpload.single('profile'),userController.postPicture)
userRouter.route('/interaction').get(userController.getInteraction).post(userController.postInteraction).patch(userController.patchInteraction).delete(userController.deleteInteraction)
userRouter.route('/message').get(userController.getMessage).post(userController.SendMessageInDirection('U2W'))

export default userRouter
