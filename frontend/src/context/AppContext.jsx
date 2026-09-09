import { useState } from "react"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

    // eslint-disable-next-line react-refresh/only-export-components
    export const AppContext = createContext()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    
const AppContextProvider = (props) => {
    const navigate = useNavigate()

    const [token,setToken] = useState((localStorage.getItem('token'))?localStorage.getItem('token'):'')

    const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/login");
  };

    const value={
        backendUrl,token,setToken,
        logout
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider