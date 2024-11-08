import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Doctor from './Components/Doctor/Doctor';
import Patients from './Components/Patients/Patients';
import Appointment from './Components/Appointment/Appointment';
import Calander1 from './Components/Calander/Calander1';
import Calander2 from './Components/Calander/Calander2';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/calander2" element={<Calander2 />} />
        <Route path="/calander1" element={<Calander1 />} />

      </Routes>
    </Router>
  )
}

export default App
