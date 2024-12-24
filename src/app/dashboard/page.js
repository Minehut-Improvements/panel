import Image from "next/image";
import Navbar from '../Navbar';

export default async function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar/>
        <div className="space-y-4">
        <div className="bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
            <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Server Dashboard</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Welcome to Server Dashboard. This is where you can control your server.</p>
            {/* no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]  h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4 */}
            <a href="#" className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]  inline-flex h-10 sm:h-10 px-4 sm:px-5 items-center px-3 py-2 text-sm font-medium text-center text-white">
                Create Server
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
        <div className="flex items-center justify-between bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
            <div className="flex items-center space-x-4">
                <div className="bg-yellow-600 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </div>
                <div>
                <p className="text-lg font-medium">Test123</p>
                <p className="text-sm text-gray-400">Status: <span className="text-yellow-500">Hibernating</span></p>
                </div>
            </div>

            <div className="flex space-x-4">
                <button className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]  inline-flex h-10 sm:h-10 px-4 sm:px-5 items-center px-3 py-2 text-sm font-medium text-center text-white">
                Activate
                </button>
            </div>
        </div>
        <div className="flex items-center justify-between bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
            <div className="flex items-center space-x-4">
                <div className="bg-lime-400 p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </div>
                <div>
                    <p className="text-lg font-medium">Test123</p>
                    <p className="text-sm text-gray-400">Status: <span className="text-lime-400">Online</span></p>
                </div>
            </div>
            <div className="flex space-x-4">
                <button className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]  inline-flex h-10 sm:h-10 px-4 sm:px-5 items-center px-3 py-2 text-sm font-medium text-center text-white">
                Manage
                </button>
            </div>
        </div>
        </div>
    </div>
  );
}
