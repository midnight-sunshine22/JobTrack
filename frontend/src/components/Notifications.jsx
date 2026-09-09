import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"

const Notifications = () => {
    const {backendUrl,token} = useContext(AppContext)

      const [notifications, setNotifications] = useState([]);
      const [showNotifications, setShowNotifications] = useState(false);

    const getNotifications = async () => {
        try {
          const {data} = await axios.get(backendUrl+'/notification',{headers:{token}})
         
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

      
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  useEffect(()=> {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getNotifications();
    } else {
      setNotifications([]);
    }
  },[token])

  return (
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
            </>
  )
}

export default Notifications