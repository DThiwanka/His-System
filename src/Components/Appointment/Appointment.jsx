import React, { useState } from 'react';
import allappointments from './AllAppointments.json';

function Appointment() {

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-8">All Appointments</h2>


      <div className="flex flex-col sm:flex-row items-center justify-between mb-3 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search by patient name..."
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none"
        />

        <select
          className="p-2 border text-sm border-gray-300 rounded-md focus:outline-none w-full sm:w-auto"
        >
          <option value="">All Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {allappointments.map((appointment) => (
          <div
            key={appointment.appointment_id}
            className="bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 mb-5 mt-5 hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{appointment.patient_name}</h3>
            <p className="text-white">
              <strong>Appointment Date:</strong> {appointment.appointment_date}
            </p>
            <p className="text-white">
              <strong>Doctor:</strong> {appointment.doctor_name} (ID: {appointment.doctor_id})
            </p>
            <p className="text-white">
              <strong>Status:</strong> {appointment.status}
            </p>
            <p className="text-gray-400 italic mt-2">{appointment.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointment;
