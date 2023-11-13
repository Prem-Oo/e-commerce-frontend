import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'

const AdminLogin = () => {

  const[userName,setUserName]=useState('')
  const[password,setPassword]=useState('')
const navigate=useNavigate();
const handleSubmit=()=>{

  // Hardcoded admin credentials
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (userName === adminUsername && password === adminPassword) {
      // If credentials match, navigate to the admin page
      navigate('/admin');
    } else {
      alert("Invalid credentials");
    }
    

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Admin Login Form
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="userName" className="sr-only">
                Username
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/" className="text-sky-600 hover:text-sky-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin