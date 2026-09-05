import { useState } from "react"
import { createContext } from "react"

    // eslint-disable-next-line react-refresh/only-export-components
    export const AppContext = createContext()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    
const AppContextProvider = (props) => {

    const [token,setToken] = useState((localStorage.getItem('token'))?localStorage.getItem('token'):'')


    const value={
        backendUrl,token,setToken
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider