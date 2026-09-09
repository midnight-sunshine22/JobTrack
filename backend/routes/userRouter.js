import express from 'express'
import { editUser, getUser, loginUser, registerUser } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/profile',authUser,getUser)
userRouter.post('/edit',authUser,editUser)

export default userRouter