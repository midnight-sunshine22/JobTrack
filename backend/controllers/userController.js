import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'


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
    const {email,password} = req.body


}

export {registerUser}