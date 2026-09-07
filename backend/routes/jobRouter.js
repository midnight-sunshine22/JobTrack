import express from 'express'
import { createJob, deleteJob, getJob, getJobs, updateJob } from '../controllers/jobController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/upload.js'

const jobRouter = express.Router()

jobRouter.post('/create',authUser,upload.single('resume'),createJob)
jobRouter.get('/all',authUser,getJobs)
jobRouter.post('/update/:id',authUser,upload.single('resume'),updateJob)
jobRouter.delete('/delete/:id',authUser,deleteJob)
jobRouter.get('/single/:id',authUser,getJob)

export default jobRouter