import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort,setSort] = useState("newest")

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/job/all");
      if (data.success) {
        setJobs(data.jobs);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchstatus = filter === "All" || job.status === filter;

    const matchsearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());

    return matchstatus && matchsearch;
  });

  const sortedJobs = [...filteredJobs].sort((a,b) => {
    if(sort==="companyAZ") {
        return a.company.localeCompare(b.company)
    }
    if(sort==="companyZA") {
        return b.company.localeCompare(a.company)
    }
    if(sort==="oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt)
    }
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;

  const interviewJobs = jobs.filter((job) => job.status === "Interview").length;

  const offerJobs = jobs.filter((job) => job.status === "Offer").length;

  const rejectedJobs = jobs.filter((job)=> job.status==='Rejected').length;

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?")
    if(!confirmDelete)  return;
    try {
      const { data } = await axios.delete(backendUrl + `/job/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500">Total Jobs</h3>
          <p className="text-3xl font-bold">{totalJobs}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500">Applied</h3>
          <p className="text-3xl font-bold">{appliedJobs}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500">Interviews</h3>
          <p className="text-3xl font-bold">{interviewJobs}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500">Offers</h3>
          <p className="text-3xl font-bold">{offerJobs}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-gray-500">Rejected</h3>
            <p className="text-3xl font-bold">{rejectedJobs}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Jobs</h1>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => navigate("/add-job")}
        >
          + Add Job
        </button>
      </div>

      <div className="mb-6">
        <input
          className="w-full p-3 border rounded-lg mb-4"
          type="text"
          placeholder="Search company or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setFilter("Applied")}
          >
            Applied
          </button>

          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setFilter("Interview")}
          >
            Interview
          </button>

          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setFilter("Offer")}
          >
            Offer
          </button>

          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setFilter("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

    <div className="flex" >
        <h2 className="font-bold p-3">Sort by:</h2>
      <select
    className="p-2 border rounded-lg"
    value={sort}
    onChange={(e) => setSort(e.target.value)}
>
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="companyAZ">Company A-Z</option>
    <option value="companyZA">Company Z-A</option>
</select>
</div>

      {sortedJobs.length===0 ? (
        <div className="text-center py-10">
            <h2 className="text-xl font-semibold">
                No jobs found 
            </h2>
            <p className="text-gray-500 mt-2">
                Try changing search or filter 
            </p>
        </div>
      ): (

      filteredJobs.map((job) => (
        <div
          key={job._id}
          className="bg-white p-5 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">{job.company}</h3>
            <p className="text-gray-600">{job.position}</p>

            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        job.status === "Applied"
            ? "bg-blue-100 text-blue-700"
            : job.status === "Interview"
            ? "bg-yellow-100 text-yellow-700"
            : job.status === "Offer"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
    }`}
>
    {job.status}
</span>
              <p>Employment: {job.employmentType}</p>
              <p>Salary: {job.salary}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => deleteJob(job._id)}
            >
              Delete Job
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => navigate(`/edit-job/${job._id}`)}
            >
              Edit Job
            </button>
          </div>
        </div>
      ))
    )}

    </div>
    
  );
};

export default Dashboard;
