import jobModel from "../models/JobModel.js";
import cloudinary from "../config/cloudinary.js";

const createJob = async(req,res)=> {
    try {
    const {company, position, status, employmentType, salary} = req.body
    let resumeUrl = ""
    if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type:"raw"
        })
        resumeUrl = result.secure_url
    }
    const userId = req.userId
    const newJob = new jobModel({userId,company,position,status,employmentType,salary,resume:resumeUrl})
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
        const {id} = req.params;
        const userId = req.userId;

        const {
            company,
            position,
            status,
            employmentType,
            salary
        } = req.body;

        const findjob = await jobModel.findOne({_id:id, userId});

        if(!findjob) {
            return res.json({
                success:false,
                message:"Job does not exist"
            });
        }

        // Update normal fields
        findjob.company = company;
        findjob.position = position;
        findjob.status = status;
        findjob.employmentType = employmentType;
        findjob.salary = salary;

        // Only update resume if a new file was selected
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type:"raw"
            });

            findjob.resume = result.secure_url;
        }

        await findjob.save();

        res.json({
            success:true,
            message:"Updated job successfully",
            job:findjob
        });

    } catch(error) {
        console.log(error.message);

        res.json({
            success:false,
            message:error.message
        });
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

const getJob = async(req,res) => {
    try {
        const {id} = req.params
        const userId = req.userId

        const job = await jobModel.findOne({_id:id,userId})
        if(!job) {
            return res.json({
                success:false,
                message:"Job not found"
            })
        }
        res.json({
            success:true,
            job
        })
    } catch(error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

export {createJob, getJobs, updateJob, deleteJob, getJob}