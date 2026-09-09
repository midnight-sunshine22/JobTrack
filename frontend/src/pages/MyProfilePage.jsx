import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfilePage = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getUser = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/profile", {
        headers: { token },
      });

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProfile = async () => {
    try {
        const { data } = await axios.post(
            backendUrl + "/user/edit",
            {
                name: user.name,
                email: user.email
            },
            {
                headers: { token }
            }
        )

        if (data.success) {
            setUser(data.user)
            setIsEditing(false)
            toast.success("Profile updated successfully")
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
    }
}

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Profile</h1>

        {user && (
          <>
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>

                <p className="text-gray-800 font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
            </div>

            {isEditing && (
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <button
                  onClick={updateProfile}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Edit Button */}
            <button
              className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
