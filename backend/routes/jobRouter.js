import express from 'express'
import { createJob, deleteJob, getJobs, updateJob } from '../controllers/jobController.js'
import authUser from '../middlewares/authUser.js'

const jobRouter = express.Router()

jobRouter.post('/create',authUser,createJob)
jobRouter.get('/all',authUser,getJobs)
jobRouter.post('/update/:id',authUser,updateJob)
jobRouter.delete('/delete/:id',authUser,deleteJob)

export default jobRouter