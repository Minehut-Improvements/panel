"use client";
import { useEffect, useState } from "react";
import Navbar from "@/app/Navbar";
import ServerConsole from "./ServerConsole";

const ManageServer = ({ params }) => {
  const [serverId, setServerId] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setServerId(resolvedParams.serverId);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!serverId) return;
      try {
        const response = await fetch(
          `https://oddbyte-api.deeka.me/getData`,
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

        const allServers = await response.json();
        const foundServer = allServers.find(server => server._id === serverId);

        if (!foundServer) {
          throw new Error("Server not found");
        }

        setServerData(foundServer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServerData();
  }, [serverId]);

  if (loading || !serverId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Loading server data... ServerID: {serverId}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
        <div className="text-leftspace-y-8 w-full max-w-prose bg-gray-800/60 text-white p-4 rounded-lg shadow-md">
          <h1 className="text-left text-2xl mb-4">
            {serverData?.name || "Server Not Found"}
          </h1>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Status: <span className={serverData?.online ? "text-green-500" : "text-red-500"}>
                {serverData?.online ? "Online" : "Offline"}
              </span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Memory: <span className="text-green-500">{serverData?.max_ram || 0} MB</span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Plan: <span className="text-blue-500">{serverData?.server_plan || "Free"}</span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Max Players: <span className="text-yellow-500">{serverData?.server_properties?.["max-players"] || 0}</span></span>
            </div>
            <div className="flex">
              <span className="text-sm">Server ID: <span className="text-gray-400 text-sm">{serverData?._id}</span></span>
            </div>
          </div>

          <div className="flex space-x-4 mt-6 justify-center">
            <button className="bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#1a1a1a] inline-flex h-10 px-5 items-center text-sm font-medium text-white">
              Start Server
            </button>
            <button className="bg-red-500/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-red-600/60 inline-flex h-10 px-5 items-center text-sm font-medium text-white">
              Stop Server
            </button>
          </div>
          <p className="mb-5"></p>
          {serverData && <ServerConsole serverId={serverData._id} />}
        </div>
      </div>
  );
};

export default ManageServer;
