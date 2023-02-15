import express from 'express'
import { filterGuest } from './filters'
const identityRouter = express.Router()

identityRouter.use(filterGuest)

identityRouter.route('/login').post()
identityRouter.route('/admin').post()
identityRouter.route('/register').post()
identityRouter.route('/beginrecovery').post()
identityRouter.route('/finishrecovery').post()

export default identityRouter