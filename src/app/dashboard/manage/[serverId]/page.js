"use client";
import Navbar from "@/app/Navbar";
import { useEffect, useState } from "react";

const ManageServer = ({ params }) => {
  const [serverId, setServerId] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Resolve the params Promise
      setServerId(resolvedParams.serverId);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!serverId) return;

      try {
        const response = await fetch(
          `https://oddbyte-api.deeka.me/proxy/server/${serverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cookie": document.cookie,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setServerData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
  }, [serverId]);

  if (loading || !serverId) {
    return <p>Loading server data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar/>
      <div className="bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
        <h1 className="text-left text-1xl">{serverData.platform || "Unknown"}</h1>
        <pre className="mt-4 bg-gray-900 p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(serverData, null, 2)}
        </pre>
      </div>
    </div>
  );
};


export default ManageServer;
