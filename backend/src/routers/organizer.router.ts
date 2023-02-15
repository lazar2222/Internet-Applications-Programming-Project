import express from 'express'
import { filterOrganizer } from './filters'
const organizerRouter = express.Router()

organizerRouter.use(filterOrganizer)

organizerRouter.route('/message').head().get().post()
organizerRouter.route('/workshop').get().patch().delete()
organizerRouter.route('/subscription').get().patch()

export default organizerRouter