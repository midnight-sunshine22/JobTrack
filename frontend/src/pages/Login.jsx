import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const {backendUrl, token, setToken} = useContext(AppContext)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const loginUser = async(e)=> {
        e.preventDefault()
        if( !email || !password) {
            toast.error("Please fill all required fields")
            return;
        }
        try {
            const {data} = await axios.post(backendUrl+"/user/login",{email,password})
            if(data.success) {
                localStorage.setItem('token',data.token)
                setToken(data.token)
                toast.success(data.message)
                navigate('/dashboard')
            } else {
                toast.error(data.message)
            }
        } catch(error) {
            toast.error(error.message)
        }
    }


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                <form onSubmit={loginUser} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Name
                        </label>
                        <input
                            className="w-full p-3 border rounded-lg"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            className="w-full p-3 border rounded-lg"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            className="w-full p-3 border rounded-lg"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
  )
}

export default Login