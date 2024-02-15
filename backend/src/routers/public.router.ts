import express from 'express'
import { publicController } from '../controllers/public.controller'
const publicRouter = express.Router()

publicRouter.route('/workshop').get(publicController.getWorkshop)
publicRouter.route('/top').get(publicController.getTop)

export default publicRouter
