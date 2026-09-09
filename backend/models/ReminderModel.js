import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
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
    date: {
        type:Date,
        required:true
    },
    note: {
        type: String,
        required: true 
    },
    completed: {
        type: Boolean,
        default: false 
    }
})

const reminderModel = mongoose.model('Reminder',reminderSchema)

export default reminderModel