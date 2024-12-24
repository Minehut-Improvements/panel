import React from "react";

const StatusCard = ({ title, status }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
      <div className="flex items-center space-x-4">
        <div className="bg-yellow-600 p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-gray-400">
            Status: <span className="text-yellow-500">{status}</span>
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white hover:bg-blue-500 px-5 py-3 rounded-md text-base">
          Activate
        </button>
      </div>
    </div>
  );
};

export default StatusCard;
