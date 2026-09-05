import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import { ToastContainer } from 'react-toastify'
import EditJob from './pages/EditJob'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-job' element={<AddJob />} />
        <Route path='/edit-job/:id' element={<EditJob />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App