import React from 'react';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <div className="bg-secondary w-1/2 h-2/3 rounded-lg shadow-lg text-center flex flex-col items-center justify-center">
        <img
          src="https://via.placeholder.com/100" // Replace with your avatar image source
          alt="Avatar"
          className="w-16 h-16 rounded-full mx-auto"
        />
        <div className="mt-4">
          <p className="text-xl font-semibold">Account Number</p>
          <p className="text-gray-600">123456789</p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold">Balance</p>
          <p className="text-green-500 text-2xl font-bold">$5,000</p>
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded-full">
          Button 1
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Button 2
        </button>
      </div>
    </div>
  );
}

export default HomePage;
