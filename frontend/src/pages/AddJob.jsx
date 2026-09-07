import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

    
const AddJob = () => {
    const navigate = useNavigate()

    const [company,setCompany] = useState('')
    const [position,setPosition] = useState('')
    const [status,setStatus] = useState('')
    const [employmentType,setEmploymentType] = useState('')
    const [salary,setSalary] = useState('')
    const [resume,setResume] = useState(null)

    const {backendUrl, token} = useContext(AppContext)

    const handleSubmit = async(e)=> {
        e.preventDefault()
        console.log('clicked')

        if(!company || !position || !status || !employmentType || !salary || !resume) {
            toast.error("Please fill all required fields")
            return;
        }

        try {
            const formData = new FormData()
            
            formData.append("company",company)
            formData.append("position",position)
            formData.append("status",status)
            formData.append("employmentType",employmentType)
            formData.append("salary",salary)

            if(resume) {
                formData.append("resume",resume)
            }
            const {data} = await axios.post(backendUrl+'/job/create',
                formData, 
                {headers: {token}}
            )
            console.log(data)

            if(data.success) {
                toast.success(data.message);

                setCompany("")
                setPosition("")
                setEmploymentType("")
                setSalary("")
                setStatus("")
                setResume(null)

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
    <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-6">
            Add Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block mb-1 font-medium">
                    Company *
                </label>
                <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Position *
                </label>
                <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Status *
                </label>
                <select
                    className="w-full p-3 border rounded-lg"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Employment Type *
                </label>
                <select
                    className="w-full p-3 border rounded-lg"
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                >
                    <option value="">Select Employment Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Salary
                </label>
                <input
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
            </div>

            <div>
    <label className="block mb-1 font-medium">
        Resume (PDF)
    </label>

    <input
        className="w-full p-3 border rounded-lg"
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
    />
</div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Add Job
            </button>

        </form>
    </div>
</div>
  )
}

export default AddJob