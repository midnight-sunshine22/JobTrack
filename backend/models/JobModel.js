import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
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