import React from 'react';
import todayApd from './TodayAppointments.json';

function TodayAppointments() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">Today’s Appointments</h2>

      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-4 sm:px-6 py-3">Patient Name</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Appointment Date</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Doctor Name (ID)</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Status</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {todayApd.map((appointment) => (
              <tr key={appointment.appointment_id} className="bg-gray-800 border-b border-gray-700">
                <td className="px-4 sm:px-6 py-3 font-medium text-white whitespace-nowrap">
                  {appointment.patient_name}
                </td>
                <td className="px-4 sm:px-6 py-3 text-gray-300">
                  {appointment.appointment_date}
                </td>
                <td className="px-4 sm:px-6 py-3 text-gray-300">
                  {appointment.doctor_name} (ID: {appointment.doctor_id})
                </td>
                <td className="px-4 sm:px-6 py-3 text-gray-300">
                  {appointment.status}
                </td>
                <td className="px-4 sm:px-6 py-3 text-gray-500 italic">
                  {appointment.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodayAppointments;
