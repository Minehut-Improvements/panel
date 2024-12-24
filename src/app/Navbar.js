import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="row-start-0 flex gap-3 mt-4 flex-wrap items-center justify-center">
      <a
        className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Home
      </a>
      <a
        className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/api"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        API Docs
      </a>
      <a
        className="no-underline bg-gray-800/60 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/links"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Useful Links
      </a>
    </nav>
  );
};

export default Navbar;