import React from 'react';
import { useNavigate } from 'react-router-dom';
import Doctor from '../Doctor/Doctor';
import TodayAppointments from '../Appointment/TodayAppointments';

function Dashboard() {
  const navigate = useNavigate();

  const doctorPage = () => {
    navigate("/doctors");
  };

  const appointmentPage = () => {
    navigate("/appointments");
  };

  const patientPage = () => {
    navigate("/patients");
  };

  return (
    <div>
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div
          onClick={doctorPage}
          className="cursor-pointer p-8 rounded-lg shadow-lg transition transform hover:scale-105 bg-gray-800"
        >

          <h5 className="mb-2 text-2xl font-semibold text-center text-gray-200">Doctor</h5>
          <p className="text-center text-gray-600 dark:text-gray-400">Manage doctor profiles, availability, and more.</p>
        </div>

        <div
          onClick={patientPage}
          className="cursor-pointer p-8 rounded-lg shadow-lg transition transform hover:scale-105 bg-gray-800"
        >

          <h5 className="mb-2 text-2xl font-semibold text-center text-gray-200">Patient</h5>
          <p className="text-center text-gray-600 dark:text-gray-400">Manage patient records, appointments, and history.</p>
        </div>

        <div
          onClick={appointmentPage}
          className="cursor-pointer p-8 rounded-lg shadow-lg transition transform hover:scale-105 bg-gray-800"
        >
          <h5 className="mb-2 text-2xl font-semibold text-center text-gray-200">Appointments</h5>
          <p className="text-center text-gray-600 dark:text-gray-400">Schedule, manage, and view appointments easily.</p>
        </div>
      </div>

      

    </div>
    <TodayAppointments />
    </div>
  );
}

export default Dashboard;
