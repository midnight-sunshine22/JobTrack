import express from 'express'
import authUser from '../middlewares/authUser.js'
import { updateReminder,createReminder,deleteReminder,getReminders } from '../controllers/reminderController.js'

const reminderRoute = express.Router()

reminderRoute.post('/:jobId',authUser,createReminder)
reminderRoute.get('/:jobId',authUser,getReminders)
reminderRoute.put('/:reminderId',authUser,updateReminder)
reminderRoute.delete('/:reminderId',authUser,deleteReminder)

export default reminderRoute