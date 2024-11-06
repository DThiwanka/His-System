import React, { useState } from 'react';
import data from './doctor.json';

function Doctor() {


    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-11/12">

                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Doctor Directory</h1>
                    <p className="text-gray-600 mt-2">Browse our list of doctors, their specialties, and contact details.</p>
                </header>

                <div className="flex flex-col sm:flex-row items-center justify-between mb-3 space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search by Name..."
                        className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-0"
                    />
                    <select
                        className="p-2 border text-sm border-gray-300 rounded-md focus:outline-none w-full sm:w-auto"
                    >
                        <option value="">Medical Condition</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Hypertension">Hypertension</option>
                        <option value="Arthritis">Arthritis</option>
                    </select>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="text-xs text-white uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Specialty</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3">Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((doctor, index) => (
                                <tr key={doctor.id}>
                                    <td className="px-6 py-4 font-medium">{doctor.first_name} {doctor.last_name}</td>
                                    <td className="px-6 py-4">{doctor.specialty}</td>
                                    <td className="px-6 py-4">{doctor.email}</td>
                                    <td className="px-6 py-4">{doctor.phone}</td>
                                    <td className="px-6 py-4">{doctor.location}</td>
                                    <td className="px-6 py-4">{doctor.years_of_experience} years</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Doctor;
