import express from 'express'
import { workshopUpload } from '../controllers/uploader'
import { workshopController } from '../controllers/workshop.controller'
import { filterUser } from './filters'
const workshopRouter = express.Router()

workshopRouter.use(filterUser)

workshopRouter.route('/past').get(workshopController.getPast)
workshopRouter.route('/subscription').get(workshopController.getSubscription).post(workshopController.postSubscription).delete(workshopController.deleteSubscription)
workshopRouter.route('/details').post(workshopController.getDetails)
workshopRouter.route('/interaction').post(workshopController.getInteractions)
workshopRouter.route('/seats').post(workshopController.SpacesTaken)
workshopRouter.route('/suggest').post(workshopUpload.single('picture'),workshopController.postSuggest('pending'))
workshopRouter.route('/picture').post(workshopUpload.single('picture'),workshopController.upload)

export default workshopRouter
