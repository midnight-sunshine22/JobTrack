import express from 'express'
import authUser from '../middlewares/authUser.js'
import { createEvent, deleteEvent, fetchEvent } from '../controllers/applicationEventController.js'

const eventRouter = express.Router()

eventRouter.post('/:jobId',authUser,createEvent)
eventRouter.get('/:jobId',authUser,fetchEvent)
eventRouter.delete('/:eventId',authUser,deleteEvent)

export default eventRouter