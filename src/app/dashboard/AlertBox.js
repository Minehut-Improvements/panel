import React, { useEffect, useState } from 'react';

const AlertBox = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically fade the alert in after 0.5 seconds and close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Close the alert after fading out (this can be adjusted)
    }, 3000); // Adjust this time as needed (in milliseconds)

    // Cleanup timeout on unmount or if the alert is dismissed early
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-auto max-w-md p-4 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 9999 }} // Ensures the alert stays on top
    >
      <div className="backdrop-blur-sm bg-gray-800/60 text-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 6L6 18M6 6l12 12"
          />
        </svg>
        <p className="flex-1 text-sm">{message}</p>
        <button onClick={onClose} className="text-white text-lg font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
