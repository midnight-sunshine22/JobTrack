import express from 'express'
import { createJob, deleteJob, getJobs, updateJob } from '../controllers/jobController.js'

const jobRouter = express.Router()

jobRouter.post('/create',createJob)
jobRouter.get('/all',getJobs)
jobRouter.post('/update/:id',updateJob)
jobRouter.delete('/delete/:id',deleteJob)

export default jobRouter