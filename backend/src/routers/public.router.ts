import express from 'express'
const publicRouter = express.Router()

publicRouter.route('/workshop').get()
publicRouter.route('/top').get()

export default publicRouter