import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import { ToastContainer } from 'react-toastify'
import EditJob from './pages/EditJob'
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-job' element={<AddJob />} />
        <Route path='/edit-job/:id' element={<EditJob />} />
      </Routes>
    </div>
  )
}

export default App