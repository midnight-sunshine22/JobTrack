import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditJob = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [salary, setSalary] = useState("");
  const [resume,setResume] = useState(null)

  const [jobs, setJobs] = useState("");

  const fetchJob = async () => {
    try {
    
      const { data } = await axios.get(backendUrl + "/job/all", {headers:{token}});
      if (data.success) {
        setJobs(data.jobs);

        const job = data.jobs.find((job) => job._id === id);

        if (job) {
          setCompany(job.company);
          setEmploymentType(job.employmentType);
          setPosition(job.position);
          setSalary(job.salary);
          setStatus(job.status);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !position || !status || !employmentType) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const formData = new FormData()

      formData.append('company',company)
      formData.append('position',position)
      formData.append('status',status)
      formData.append('employmentType',employmentType)
      formData.append('salary',salary)

      if(resume) {
        formData.append('resume',resume)
      }
      const { data } = await axios.post(backendUrl + `/job/update/${id}`, formData, {headers:{token}});
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
    <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-6">
            Edit Job
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

            <div> <label className="block mb-1 font-medium"> Replace Resume (PDF) </label> <input className="w-full p-3 border rounded-lg" type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} /> <p className="text-sm text-gray-500 mt-1"> Leave empty to keep the existing resume. </p> </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Edit Job
            </button>

        </form>
    </div>
</div>
  );
};

export default EditJob;
