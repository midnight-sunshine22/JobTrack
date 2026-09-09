import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ApplicationEvent from "./ApplicationEvent";
import Reminders from "./Reminders";

const JobDetails = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const getJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/job/single/${id}`, {
        headers: { token },
      });
      console.log("JOB DETAILS RESPONSE:", data);
      if (data.success) {
        setJob(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

 

 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getJob();
  }, [token, id]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {job.position}
              </h1>

              <p className="text-lg text-gray-600 mt-2">{job.company}</p>
            </div>

            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              {job.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Employment Type</p>

              <p className="font-semibold text-gray-800 mt-1">
                {job.employmentType}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Salary</p>

              <p className="font-semibold text-gray-800 mt-1">{job.salary}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Applied On</p>

              <p className="font-semibold text-gray-800 mt-1">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Resume</p>

              {job.resume ? (
                <button
                  onClick={() => window.open(job.resume, "_blank")}
                  className="text-blue-600 hover:underline mt-1"
                >
                  View Resume
                </button>
              ) : (
                <p className="text-gray-500 mt-1">No resume uploaded</p>
              )}
            </div>
          </div>

          <ApplicationEvent />

          <Reminders />

          

          <div className="flex gap-3 mt-10">
            <button
              onClick={() => navigate(`/edit-job/${job._id}`)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Edit Job
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
