import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Login</h1>
        <p className="text-center text-gray-500 mb-8">Welcome back! Please enter your details.</p>

        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Username" 
          className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="flex justify-end mb-6">
          <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
        </div>

        <button 
          onClick={handleDashboard} 
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          
        </div>
      </div>
    </div>
  );
}

export default Login;
