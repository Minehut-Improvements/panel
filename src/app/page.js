import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-8xl font-bold text-center sm:text-start">
          <span className="text-shadow text-5xl text-white text-5xl font-bold drop-shadow-[4px_4px_0px_#09ADD3]">Welcome to Minehut Improvements!</span>
        </p>
        <ol className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">This website exist because Minehut Needs to be improved.</li>
          <li>Lorem Lorem Lorem Lorem Lorem</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/Minehut-Improvements"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Our Github
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            sample button.
          </a>
        </div>
        <p className="text-8xl font-bold text-center sm:text-start">
          <span className="text-shadow text-5xl text-white text-5xl font-bold">Image Gallery!</span>
        </p>
        <ol className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="">That one time when they decide to test on production</li>
        </ol>
        <Image
          aria-hidden
          src="https://oddbyte.dev/images/minehut/minehut_raid/furrygang_spam.png"
          alt="Test on Prod Moment."
          width={720}
          height={856}
        />
      </main>
      <nav className="row-start-0 flex gap-3 mt-4 flex-wrap items-center justify-center">
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
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
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
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
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
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
    </div>
  );
}
