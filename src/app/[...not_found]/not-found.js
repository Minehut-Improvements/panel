import Link from 'next/link';
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="">
      </nav>
      <div>
        <Image
          className='mb-4 mx-auto'
          aria-hidden
          src="/Tux.svg"
          alt="404 Lol!"
          width={220}
          height={220}
        />
        <h1 className="text-4xl font-bold text-center mb-4">We could not process your request.</h1>
        <h1 className='text-1xl font-bold text-center'>The requested page could not be found.</h1>
      </div>
      <a
          className="no-underline hover:underline rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go back to home directory!
        </a>
      <div>
      </div>
    </div>
  );
}
