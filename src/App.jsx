import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Doctor from './Components/Doctor/Doctor';
import Patients from './Components/Patients/Patients';
import Appointment from './Components/Appointment/Appointment';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointment />} />

      </Routes>
    </Router>
  )
}

export default App
