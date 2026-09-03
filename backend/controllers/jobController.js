import jobModel from "../models/JobModel.js";

const createJob = async(req,res)=> {
    try {
    const {company, position, status, employmentType, salary} = req.body
    const newJob = new jobModel({company,position,status,employmentType,salary})
    await newJob.save();

    res.json({
        success:true,
        message: "Job created succesfully",
        job:newJob
    })

    } catch(error) {
        console.log(error.message)

        res.json({success:false,message:error.message})
    }
}

const getJobs = async(req,res)=> {
    try {
        const jobs = await jobModel.find({})

        res.json({
            success:true,
            jobs
        })
    } catch(error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}

const updateJob = async(req,res)=> {
    try {
    const {id} = req.params 
    const {company,position,status,employmentType,salary} = req.body
    const job=await jobModel.findByIdAndUpdate(id,{company,position,status,employmentType,salary},{new:true})

    res.json({
        success:true,
        message:"Updated job succesffully",
        job:job
    })
}   catch(error) {
    console.log(error.message)
    res.json({
        success:false,
        message:error.message
    })
}
}

const deleteJob = async(req,res)=> {
    try {
        const {id} = req.params
        const job=await jobModel.findByIdAndDelete(id);

        if(!job) {
            return res.json({
                success:false,
                message:"Job not found"
            })
        }

        res.json({
            success:true,
            message:"Deleted job successfully"
        })
    } catch(error) {
        console.log(error.message)

        res.json({success:false,message:error.message})
    }
}

export {createJob, getJobs, updateJob, deleteJob}