import mongoose from "mongoose";

const ApplicationEventSchema = new mongoose.Schema({
    jobId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true 
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    type: {
        type:String,
        enum:["Applied","HR Contacted","Assessment","Interview","Final round","Offer","Rejected"],
        required:true
    },
    date: {
        type:Date,
        required:true 
    },
    note: {
        type:String,
        default:""
    }
})

const applicationEventModel = mongoose.model("ApplicationEvent",ApplicationEventSchema)

export default applicationEventModel