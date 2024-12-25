import Image from "next/image";
import Navbar from '../Navbar';

export default async function Login() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar/>
        <div className="space-y-4">
        <div className="bg-gray-800/60 text-white p-4 rounded-lg shadow-md w-full max-w-prose">
            <a>
                <h5 className="mb-5 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Please Login!</h5>
            </a>
            <p className="text-center mb-2 font-normal text-gray-700 dark:text-gray-400">You are currently not logged in.</p>
            <p className="text-center mb-5 font-normal text-gray-700 dark:text-gray-400">Please login with OddByte's Extention!</p>
            <div className="flex flex-col items-center justify-center">
                <a href="#" className="justify-center no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]  inline-flex h-10 sm:h-10 px-4 sm:px-5 items-center justify-center text-sm font-medium text-center text-white">
                    This button does nothing.
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
    </div>
  );
}

