import React, { useState, useEffect } from "react";
import AlertBox from "./AlertBox";

const StatusCard = ({ name, status, serverId, setResponseMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleActivateClick = async () => {
    if (status === "Online") {
      window.location.href = `/dashboard/manage/${serverId}`;
      return;
    }

    setIsLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        `https://oddbyte-api.deeka.me/proxy/server/${serverId}/start_service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": document.cookie,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setResponseMessage("Server started successfully!");
      } else {
        setResponseMessage("Failed to start server. Try again.");
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
      <div className="flex items-center space-x-4">
        <div
          className={`p-2 rounded ${
            status === "Online" ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {status === "Online" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
        </div>
        <div>
          <p className="text-lg font-medium">{name}</p>
          <p className="text-sm text-gray-400">
            Status:{" "}
            <span
              className={status === "Online" ? "text-green-500" : "text-yellow-500"}
            >
              {status}
            </span>
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleActivateClick}
          disabled={isLoading}
          className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] inline-flex h-10 sm:h-10 px-4 sm:px-5 items-center text-sm font-medium text-white"
        >
          {isLoading
            ? "Starting..."
            : status === "Online"
            ? "Manage"
            : "Activate"}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    if (!cookies) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        const response = await fetch("https://oddbyte-api.deeka.me/getData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cookie": document.cookie,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCloseAlert = () => {
    setResponseMessage("");
  };

  if (loading) {
    return (
      <div className="text-center bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
        <h5 className="mb-2 text-2xl font-bold">Please wait.</h5>
        <p>Please wait while we are loading the data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
        <h5 className="mb-2 text-2xl font-bold">Oops, there's an error</h5>
        <p>There was an error: <span className="text-red-500">{error}</span></p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {responseMessage && (
        <AlertBox message={responseMessage} onClose={handleCloseAlert} />
      )}
      {data.map((item, index) => (
        <StatusCard
          key={index}
          name={item.name || "Unknown"}
          status={
            item.status === "SERVICE_OFFLINE"
              ? "Offline"
              : item.status === "ONLINE"
              ? "Online"
              : "Starting..."
          }
          serverId={item._id}
          setResponseMessage={setResponseMessage}
        />
      ))}
    </div>
  );
};

export default App;
