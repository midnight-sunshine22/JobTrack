import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Myprofile = () => {
    const [user, setUser] = useState(null);

    const { backendUrl, token } = useContext(AppContext);

    const getUser = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/user/profile",
                { headers: { token } }
            );

            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        >
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                    {user?.name}
                </p>

                <p className="text-xs text-gray-500">
                    {user?.email}
                </p>
            </div>
        </Link>
    );
};

export default Myprofile;