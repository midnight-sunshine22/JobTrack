import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    reminderId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reminder",
        required:true 
    },
    message: {
        type:String,
        required:true 
    },
    isRead: {
        type:Boolean,
        default:false
    },
},
{
    timestamps:true 
})

const notificationModel = mongoose.model('Notification',notificationSchema)

export default notificationModel