import mongoose from "mongoose";

const connectDB = async()=> {
    mongoose.connection.on('connected',()=> {
        console.log('DATABASE CONNECTED')
    })

    try {
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch(error) {
        console.log('DATABASE CONNECTION FAILED',error.message)
    }
}
export default connectDB