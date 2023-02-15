import express from 'express'
import { filterUser } from './filters'
const workshopRouter = express.Router()

workshopRouter.use(filterUser)

workshopRouter.route('/past').get()
workshopRouter.route('/subscription').get().post().delete()
workshopRouter.route('/details').get()
workshopRouter.route('/suggest').post()

export default workshopRouter