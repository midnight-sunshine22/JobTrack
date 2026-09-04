import { createContext } from "react"

    export const AppContext = createContext()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

const AppContextProvider = (props) => {

    const value={
        backendUrl
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider