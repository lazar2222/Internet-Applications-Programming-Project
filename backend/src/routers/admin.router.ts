import express from 'express'
import { identityController } from '../controllers/identity.controller'
import { profileUpload, workshopUpload } from '../controllers/uploader'
import { adminController } from '../controllers/admin.controller'
import { filterAdmin } from './filters'
const adminRouter = express.Router()

adminRouter.use(filterAdmin)

adminRouter.route('/user').get(adminController.getUser).post(profileUpload.single('profile'),identityController.registerWithStatus('active')).patch(adminController.patchUser).delete(adminController.deleteUser)
adminRouter.route('/picture').post(profileUpload.single('profile'),adminController.postPicture)
adminRouter.route('/request').patch(adminController.patchRequest)
adminRouter.route('/workshop').get(adminController.getWorkshop).post(workshopUpload.single('picture'),adminController.postWorkshop).patch(workshopUpload.single('picture'),adminController.patchWorkshop).delete(adminController.deleteWorkshop)
adminRouter.route('/sugestion').patch(adminController.patchSugestion)
adminRouter.route('/valid').get(adminController.getValid)

export default adminRouter
