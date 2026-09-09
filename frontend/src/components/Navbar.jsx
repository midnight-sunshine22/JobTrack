import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, backendUrl } = useContext(AppContext);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getNotifications = async () => {
    try {
      const {data} = await axios.get(backendUrl+'/notification',{headers:{token}})
      console.log(data)
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const {data} = await axios.patch(backendUrl+ `/notification/${notificationId}`,{},{headers:{token}})

      if (data.success) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, isRead: true }
              : notification,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getNotifications();
    } else {
      setNotifications([]);
    }
  }, [token]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

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
            <>
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
                >
                  <span className="text-xl">🔔</span>

                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                    </div>

                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <button
                            key={notification._id}
                            onClick={() => markAsRead(notification._id)}
                            className={`w-full text-left px-4 py-4 border-b last:border-b-0 hover:bg-gray-50 transition ${
                              !notification.isRead ? "bg-blue-50" : "bg-white"
                            }`}
                          >
                            <div className="flex gap-3">
                              <span className="text-lg">🔔</span>

                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {notification.message}
                                </p>

                                {!notification.isRead && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    New
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
