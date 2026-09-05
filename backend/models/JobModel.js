import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    company: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['Applied','Interview','Offer','Rejected'],
        required: true
    },

    employmentType: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
})

const jobModel = mongoose.model('Job', JobSchema)

export default jobModel