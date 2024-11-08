import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarApp() {
    const [value, setValue] = useState();
    const [appointments, setAppointments] = useState([]);
    const [appointmentName, setAppointmentName] = useState('');
    const [appointmentRemarks, setAppointmentRemarks] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
    }, []);

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    const handleBooking = () => {
        if (!appointmentName || !appointmentTime || !value) {
            alert('Please fill in all fields and select a date.');
            return;
        }

        const newAppointment = {
            name: appointmentName,
            time: appointmentTime,
            remarks: appointmentRemarks,
            date: value,
        };

        setAppointments([...appointments, newAppointment]);

        setAppointmentName('');
        setAppointmentTime('');
        setAppointmentRemarks('');
        setValue(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4">
            <h1 className='text-4xl font-semibold mb-8 text-center text-blue-600 tracking-tight'>Appointment Booking</h1>

            <div className='flex flex-col sm:flex-row items-center justify-center w-full max-w-6xl p-8 space-y-8 sm:space-y-0 sm:space-x-8'>

                <div className='flex-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-200'>
                    <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>Scheduled Appointments</h2>


                    {appointments.length > 0 ? (
                        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-auto overflow-y-auto p-4'>
                            {appointments.map((appointment, index) => (
                                <div
                                    key={index}
                                    className='p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'
                                >
                                    <h3 className='text-xl font-semibold mb-2 text-gray-900'>{appointment.name}</h3>
                                    <div className='text-sm text-gray-700 space-y-2'>
                                        <div className='flex items-center'>
                                            <span className='font-medium text-blue-600'>Time:</span>
                                            <span className='ml-2 text-gray-800'>{appointment.time}</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <span className='font-medium text-blue-600'>Date:</span>
                                            {/* <span className='ml-2 text-gray-800'>
                                                {Array.isArray(appointment.date)
                                                    ? `${new Date(appointment.date[0]).toLocaleDateString()} - ${new Date(appointment.date[1]).toLocaleDateString()}`
                                                    : new Date(appointment.date).toLocaleDateString()}
                                            </span> */}

                                            <span className='ml-2 text-gray-800'>
                                                {(appointment.date).toLocaleDateString()}
                                            </span>

                                        </div>
                                        {appointment.remarks && (
                                            <div className='flex items-center mt-2'>
                                                <span className='font-medium text-blue-600'>Remarks:</span>
                                                <span className='ml-2 text-gray-800'>{appointment.remarks}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-gray-600 mt-6'>No appointments booked yet.</p>
                    )}



                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='w-full mt-8 p-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-lg shadow-md'
                    >
                        Add New Appointment
                    </button>
                </div>
            </div>


            {isModalOpen && (


                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 relative">

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-semibold focus:outline-none"
                        >
                            &times;
                        </button>

                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
                            Book Your Appointment
                        </h2>

                        <div className="flex flex-col sm:flex-row md:flex-row gap-6 sm:gap-10 w-full">


                            <div className="w-full sm:w-2/3 mb-6 sm:mb-0 p-4 rounded-lg bg-white">
                                <Calendar
                                    onChange={setValue}
                                    value={value}
                                    selectRange={false}
                                    defaultView="month"
                                    className="w-full max-w-md mx-auto rounded-lg shadow-lg bg-gray-50 text-gray-800"
                                    tileClassName="hover:bg-blue-100 focus:bg-blue-200 active:bg-blue-300 rounded-lg"

                                />
                            </div>



                            <div className="w-full sm:w-2/3 space-y-6 sm:space-y-8">

                                <div className="flex items-center border border-gray-300 rounded-xl shadow-md w-full">
                                    <input
                                        type="text"
                                        placeholder="Enter Appointment Name"
                                        value={appointmentName}
                                        onChange={(e) => setAppointmentName(e.target.value)}
                                        className="p-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-300"
                                    />
                                </div>

                                <div className="flex items-center border border-gray-300 rounded-xl shadow-md w-full">
                                    <input
                                        type="text"
                                        placeholder="Enter Appointment Remaks"
                                        value={appointmentRemarks}
                                        onChange={(e) => setAppointmentRemarks(e.target.value)}
                                        className="p-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-300"
                                    />
                                </div>



                                <div className="flex items-center border border-gray-300 rounded-xl shadow-md">
                                    <input
                                        type="time"
                                        value={appointmentTime}
                                        onChange={(e) => setAppointmentTime(e.target.value)}
                                        className="p-4 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-300"
                                    />
                                </div>


                                <div className="flex gap-4">

                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full sm:w-1/2 p-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 text-lg transform hover:scale-105"
                                    >
                                        Close
                                    </button>


                                    <button
                                        onClick={handleBooking}
                                        className="w-full sm:w-1/2 p-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 focus:ring-2 focus:ring-blue-500 text-lg transform hover:scale-105"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            )}
        </div>
    );
}

export default CalendarApp;
