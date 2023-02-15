import express from 'express'
import { filterAdmin } from './filters'
const adminRouter = express.Router()

adminRouter.use(filterAdmin)

adminRouter.route('/user').head().get().post().patch().delete()
adminRouter.route('/request').get().patch()
adminRouter.route('/workshop').head().get().post().patch().delete()
adminRouter.route('/sugestion').get().patch()

export default adminRouter