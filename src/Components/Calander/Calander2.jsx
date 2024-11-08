import { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import axios from 'axios';

const localizer = momentLocalizer(moment);

function Calander2() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [appointmentName, setAppointmentName] = useState('');
    const [appointmentRemarks, setAppointmentRemarks] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [appointmentDuration, setAppointmentDuration] = useState(30); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments.map(app => ({
            ...app,
            start: new Date(app.start),
            end: new Date(app.end)
        })));
    }, []);

    
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);



    const handleBooking = async () => {
        if (!appointmentName || !appointmentTime || !selectedDate) {
            setErrorMessage('Please fill in all fields and select a date.');
            return;
        }
    
   
        const startDateTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${appointmentTime}`);
        const endDateTime = new Date(startDateTime.getTime() + appointmentDuration * 60000);
    
        
        const isOverlapping = appointments.some((app) =>
            startDateTime < app.end && endDateTime > app.start
        );
    
        if (isOverlapping) {
            setErrorMessage('The selected time overlaps with another appointment.');
            return;
        }
    
        const newAppointment = {
            title: appointmentName,
            start: startDateTime,
            end: endDateTime,
            remarks: appointmentRemarks,
            appointmentDate: selectedDate.toISOString().split('T')[0],
            appointmentTime
        };
    
        setLoading(true);
        setAppointments([...appointments, newAppointment]);
    
        
        try {
            await axios.post('http://localhost:5000/send-email', {
                appointmentName,
                appointmentRemarks,
                appointmentDate: selectedDate.toISOString().split('T')[0],
                appointmentTime,
            });


    
            console.log('Email sent successfully');
            alert("Email Sent!")
            console.log(newAppointment)
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage('There was an error sending the email. Please try again.');
        }
    
        
        setAppointmentName('');
        setAppointmentTime('');
        setAppointmentRemarks('');
        setAppointmentDuration(30);
        setSelectedDate(null);
        setIsModalOpen(false);
        setLoading(false);
        setErrorMessage('');
    };
    

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4">
            <h1 className="text-4xl font-semibold mb-8 text-center text-blue-600 tracking-tight">Appointment Booking</h1>

            <div className="w-full max-w-6xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Scheduled Appointments</h2>

                <BigCalendar
                    localizer={localizer}
                    events={appointments}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    className="bg-gray-50 p-6 rounded-xl"
                    defaultView="month"
                />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full mt-8 p-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-lg shadow-md"
                >
                    Add New Appointment
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
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

                        {errorMessage && (
                            <div className="text-red-500 mb-4 text-center">
                                {errorMessage}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row md:flex-row gap-6 sm:gap-10 w-full">
                            <div className="w-full sm:w-2/3 mb-6 sm:mb-0 p-4 rounded-lg bg-white">
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    className="react-calendar"
                                    minDate={new Date()}
                                    
                                />
                            </div>

                            <div className="w-full sm:w-2/3 space-y-6 sm:space-y-8">
                                <input
                                    type="text"
                                    placeholder="Enter Appointment Name"
                                    value={appointmentName}
                                    onChange={(e) => setAppointmentName(e.target.value)}
                                    className="p-4 w-full border border-gray-300 rounded-lg shadow-md"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Appointment Remarks"
                                    value={appointmentRemarks}
                                    onChange={(e) => setAppointmentRemarks(e.target.value)}
                                    className="p-4 w-full border border-gray-300 rounded-lg shadow-md"
                                />
                                <input
                                    type="time"
                                    value={appointmentTime}
                                    onChange={(e) => setAppointmentTime(e.target.value)}
                                    className="p-4 w-full border border-gray-300 rounded-lg shadow-md"
                                />
                                <div className="w-full">
                                    <label htmlFor="duration" className="block mb-2 text-gray-700">Duration (Minutes)</label>
                                    <input
                                        type="number"
                                        id="duration"
                                        value={appointmentDuration}
                                        onChange={(e) => setAppointmentDuration(Number(e.target.value))}
                                        min="1"
                                        max="240"
                                        className="p-4 w-full border border-gray-300 rounded-lg shadow-md"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full p-4 bg-gray-300 text-gray-800 rounded-lg shadow-md"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleBooking}
                                        className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow-md"
                                        disabled={loading}
                                    >
                                        {loading ? 'Booking...' : 'Confirm Booking'}
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

export default Calander2;
