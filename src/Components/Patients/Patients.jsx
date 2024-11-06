import React from 'react'
import patientdata from './patients.json'

function Patients() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-11/12">

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Patient Directory</h1>
          <p className="text-gray-600 mt-2">Manage patient records, appointments, and history.</p>
        </header>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-3 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search by Name..."
            className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-0"
          />

          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              className="p-2 border text-sm border-gray-300 rounded-md focus:outline-none w-full sm:w-auto"
            >
              <option value="">Medical Condition</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Arthritis">Arthritis</option>
            </select>

            <select
              className="p-2 border text-sm border-gray-300 rounded-md focus:outline-none w-full sm:w-auto"
            >
              <option value="">Doctor Assigned</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Jones">Dr. Jones</option>
              <option value="Dr. Lee">Dr. Lee</option>
            </select>
          </div>
        </div>



        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-white uppercase bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Age</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Medical Condition</th>
                <th scope="col" className="px-6 py-3">Doctor Assgined</th>
              </tr>
            </thead>
            <tbody>
              {patientdata.map((patient, index) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 font-medium">{patient.first_name} {patient.last_name}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{patient.email}</td>
                  <td className="px-6 py-4">{patient.phone}</td>
                  <td className="px-6 py-4">{patient.address}</td>
                  <td className="px-6 py-4">{patient.medical_condition}</td>
                  <td className="px-6 py-4">{patient.doctor_assigned} years</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Patients
