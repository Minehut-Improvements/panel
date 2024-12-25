import React, { useEffect, useState } from 'react';

const AlertBox = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial position
    setPosition(window.scrollY);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 w-auto max-w-md p-4 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        zIndex: 9999,
        top: `${position}px`, // Update top position based on scroll
      }}
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
