
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { backendUrl, token } = useContext(AppContext);

    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/job/all",
                {
                    headers: { token }
                }
            );

            if (data.success) {
                setJobs(data.jobs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteJob = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {
            const { data } = await axios.delete(
                backendUrl + `/job/delete/${id}`,
                {
                    headers: { token }
                }
            );

            if (data.success) {
                toast.success(data.message);

                setJobs((prevJobs) =>
                    prevJobs.filter((job) => job._id !== id)
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchJobs();
        }
    }, [token]);

    // Statistics
    const totalJobs = jobs.length;

    const appliedJobs = jobs.filter(
        (job) => job.status === "Applied"
    ).length;

    const interviewJobs = jobs.filter(
        (job) => job.status === "Interview"
    ).length;

    const offerJobs = jobs.filter(
        (job) => job.status === "Offer"
    ).length;

    const rejectedJobs = jobs.filter(
        (job) => job.status === "Rejected"
    ).length;

    // Filter
    const filteredJobs = jobs.filter((job) => {
        const matchStatus =
            filter === "All" || job.status === filter;

        const matchSearch =
            job.company
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            job.position
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchStatus && matchSearch;
    });

    // Sort
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sort === "companyAZ") {
            return a.company.localeCompare(b.company);
        }

        if (sort === "companyZA") {
            return b.company.localeCompare(a.company);
        }

        if (sort === "oldest") {
            return (
                new Date(a.createdAt) -
                new Date(b.createdAt)
            );
        }

        return (
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    });

    const getStatusStyle = (status) => {
        if (status === "Applied") {
            return "bg-blue-100 text-blue-700";
        }

        if (status === "Interview") {
            return "bg-yellow-100 text-yellow-700";
        }

        if (status === "Offer") {
            return "bg-green-100 text-green-700";
        }

        return "bg-red-100 text-red-700";
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Track and manage your job applications
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/add-job")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                    >
                        + Add Job
                    </button>

                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Total Jobs
                        </p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            {totalJobs}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Applied
                        </p>
                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                            {appliedJobs}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Interviews
                        </p>
                        <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                            {interviewJobs}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Offers
                        </p>
                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                            {offerJobs}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">
                            Rejected
                        </p>
                        <h2 className="text-3xl font-bold text-red-600 mt-2">
                            {rejectedJobs}
                        </h2>
                    </div>

                </div>

                {/* Jobs Section */}
                <div className="bg-white rounded-xl shadow-sm border p-6">

                    {/* Jobs Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                My Jobs
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                {sortedJobs.length} job
                                {sortedJobs.length !== 1 && "s"} found
                            </p>
                        </div>

                        {/* Sort */}
                        <select
                            className="p-2.5 border rounded-lg text-gray-700 bg-white"
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                        >
                            <option value="newest">
                                Newest First
                            </option>

                            <option value="oldest">
                                Oldest First
                            </option>

                            <option value="companyAZ">
                                Company A-Z
                            </option>

                            <option value="companyZA">
                                Company Z-A
                            </option>
                        </select>

                    </div>

                    {/* Search */}
                    <input
                        className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Search by company or position..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap mb-8">

                        {[
                            "All",
                            "Applied",
                            "Interview",
                            "Offer",
                            "Rejected"
                        ].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filter === status
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {status}
                            </button>
                        ))}

                    </div>

                    {/* Jobs */}
                    {sortedJobs.length === 0 ? (

                        <div className="text-center py-16">

                            <h3 className="text-xl font-semibold text-gray-700">
                                No jobs found
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Try changing your search or filter.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {sortedJobs.map((job) => (

                                <div
                                    key={job._id}
                                    className="border rounded-xl p-5 hover:shadow-md transition"
                                >

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                        {/* Job Information */}
                                        <div>

                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {job.position}
                                            </h3>

                                            <p className="text-gray-600 mt-1">
                                                {job.company}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3 mt-3">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                                                        job.status
                                                    )}`}
                                                >
                                                    {job.status}
                                                </span>

                                                <span className="text-sm text-gray-500">
                                                    {job.employmentType}
                                                </span>

                                                <span className="text-sm text-gray-500">
                                                    Salary: {job.salary}
                                                </span>

                                            </div>

                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-job/${job._id}`
                                                    )
                                                }
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteJob(job._id)
                                                }
                                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
};

export default Dashboard;
