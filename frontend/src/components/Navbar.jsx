
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AppContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    JobTracker
                </Link>

                {/* Navigation Links */}
                {token && (
                    <div className="flex items-center gap-6">

                        <Link
                            to="/dashboard"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/add-job"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                        >
                            Add Job
                        </Link>

                    </div>
                )}

                {/* Right Side */}
                <div className="flex items-center gap-3">

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
