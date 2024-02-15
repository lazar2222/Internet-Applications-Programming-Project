import express from 'express'
import { organizerController } from '../controllers/organizer.controller'
import { workshopUpload } from '../controllers/uploader'
import { filterOrganizer } from './filters'
const organizerRouter = express.Router()

organizerRouter.use(filterOrganizer)

organizerRouter.route('/message').put(organizerController.getMessage).post(organizerController.postMessage)
organizerRouter.route('/workshop').get(organizerController.getWorkshop).patch(workshopUpload.single('picture'),organizerController.patchWorkshop).delete(organizerController.deleteWorkshop)
organizerRouter.route('/subscription').post(organizerController.getSubscription).patch(organizerController.patchSubscription)
organizerRouter.route('/all').get(organizerController.getAll)

export default organizerRouter
