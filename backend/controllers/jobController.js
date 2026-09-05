import jobModel from "../models/JobModel.js";

const createJob = async(req,res)=> {
    try {
    const {company, position, status, employmentType, salary} = req.body
    const userId = req.userId
    const newJob = new jobModel({userId,company,position,status,employmentType,salary})
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
        const jobs = await jobModel.find({userId:req.userId})

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
    const userId = req.userId
    const {company,position,status,employmentType,salary} = req.body
    const job=await jobModel.findByIdAndUpdate({_id:id,userId},
        {company,position,status,employmentType,salary},{new:true})

    if(!job) {
        return res.json({
            success:false,
            message:"Job not found"
        })
    }

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
        const userId = req.userId
        const job=await jobModel.findByIdAndDelete({_id:id,userId});

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