import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const registerUser = async(req,res)=> {
    try {
        const {name,email,password} = req.body 

        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        const user = new userModel({name,email,password:hashedPassword})
        await user.save()

        res.json({
            success:true,
            message:"User registered successfully"
        })
    } catch(error) {
        console.log(error.message)

        res.json({
            success:false,
            message:error.message
        })
    }
}

const loginUser = async(req,res) => {
    try {
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user) {
        return res.json({
            success:false,
            message:"Invalid email"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        return res.json({
            success:false,
            message:"Invalid password"
        })
    }

    const token = jwt.sign(
        { id:user._id},
        process.env.JWT_SECRET
    )
    res.json({
        success:true,
        message:"Login successful",
        token
    })
} catch(error) {
    console.log(error.message)
    res.json({
        success:false,
        message:error.message
    })
}
}

export {registerUser, loginUser}