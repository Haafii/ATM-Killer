import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [mobNum,setMobNum] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();

    try {
      // Simulate a delay (replace this with your actual OTP sending logic)
      setIsLoading(true);
      setError(null);

      // Simulate OTP sending for demonstration purposes (remove this in production)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If OTP is sent successfully, you can update your UI or show a success message
      setIsLoading(false);
      setOtpSent(true);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to send OTP. Please try again."); // Handle error appropriately
    }
  };

  const onLogin = (event) => {
    setIsLoading(true);
    event.preventDefault();
   
  };

  return (
    <div className="bg-primary flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex items-center w-full px-2 md:px-20">
        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
          <p className='text-6xl text-blue-500 font-bold'>ATM Killer</p>
          <p className='font-medium text-lg leading-1 text-white'>Unlock Boundless Banking with ATM Killer.</p>
        </div>
        <div className="bg-secondary rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
          <h2 className='p-3 text-3xl font-bold text-white'>ATM Killer</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <h3 className='text-xl font-semibold text-white pt-2 mb-2'>Welcome Back</h3>
          <form className="mt-8 space-y-6 ">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="mobNum"
                name="mobNum"
                type="text"
                autoComplete="tel"
                required
                value={mobNum}
                onChange={(e) => setMobNum(e.target.value)}
                className="rounded mb-2  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Reg. Mobile Number"
              />
            </div>
            {otpSent && (
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="OTP"
                />
              </div>
            )}
          </div>

          {otpSent ? (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={onLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={sendOTP}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          )}
        </form>
          <p className='text-white mt-4 text-sm'>Don't have an account?</p>
          <Link
            className='text-white mb-4 text-sm font-medium cursor-pointer'
            to="/register"
          >
            Create a New Account?
          </Link>
        </div>
      </main>
    </div>
  )
}
export default Login
    