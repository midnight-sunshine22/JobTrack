import applicationEventModel from "../models/applicationEventModel.js";

const createEvent = async(req,res)=> {
    try {
        const userId = req.userId
        const {jobId} = req.params 
        const {type,date,note} = req.body 
        
        const event = new applicationEventModel({jobId,userId,type,date,note})
        await event.save()

        res.json({
            success:true,
            message:"New application created",
            event
        })
    } catch(error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const fetchEvent = async(req,res)=> {
    try {
        const {jobId} = req.params
        const userId = req.userId

        const event = await applicationEventModel.find({jobId,userId})
        if(!event) {
            return res.json({
                success:false,
                message:"Application not found"
            })
        }
        res.json({
            success:true,
            event 
        })
    } catch(error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const deleteEvent = async(req,res)=> {
    try {
        const {eventId} = req.params
        const userId = req.userId
        const event = await applicationEventModel.findByIdAndDelete({
            _id:eventId,
            userId
        })
        
        if(!event) {
            return res.json({
                success:false,
                message:"Application not found"
            })
        }
        res.json({
            success:true,
            message:"Deleted application successfully"
        })
    }
     catch(error) {
        res.json({
            success:false,
            message:error.message
        })
     }
}

export {createEvent,fetchEvent,deleteEvent}