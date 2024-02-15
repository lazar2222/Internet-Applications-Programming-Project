import express from 'express'
import { profileUpload } from '../controllers/uploader'
import { identityController } from '../controllers/identity.controller'
import { filterGuest } from './filters'
const identityRouter = express.Router()

identityRouter.use(filterGuest)

identityRouter.route('/login').post(identityController.loginRole(['participant','organizer']))
identityRouter.route('/admin').post(identityController.loginRole(['admin']))
identityRouter.route('/register').post(profileUpload.single('profile'),identityController.registerWithStatus('pending'))
identityRouter.route('/beginrecovery').post(identityController.postBeginrecovery)
identityRouter.route('/finishrecovery').post(identityController.postFinishrecovery)

export default identityRouter
