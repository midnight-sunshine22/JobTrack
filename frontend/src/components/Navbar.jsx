import { Link } from "react-router-dom";
import { useContext} from "react";
import { AppContext } from "../context/AppContext";
import Notifications from "./Notifications";
import Myprofile from "../pages/Myprofile";

const Navbar = () => {

  const { token , logout} = useContext(AppContext);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          JobTracker
        </Link>

        {/* Navigation Links */}
        {token && (
          <div className="flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>

            <Link
              to="/add-job"
              className="text-gray-600 hover:text-blue-600 font-medium transition"
            >
              Add Job
            </Link>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex gap-4">
            <Notifications />
            <Myprofile />
            {/* Logout */}
    <button
        onClick={logout}
        className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition shadow-sm"
    >
        Logout
    </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
