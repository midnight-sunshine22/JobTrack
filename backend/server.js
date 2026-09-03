import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import jobRouter from './routes/jobRouter.js'
const app=express()

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/job' ,jobRouter)

app.get('/',(req,res)=> {
    res.send('HOME PAGE')
})

app.post('/api/jobs',(req,res)=> {
    const {company,position} = req.body
    res.send({company,position})
})

app.get('/api/test',(req,res)=> {
    res.send('JobTrack working')
})

app.listen(4000, ()=> {
    console.log('SERVER LISTENING ON PORT 4000')
})