import Image from "next/image";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar/>
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
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/Minehut-Improvements"
            target="_blank"
          >
            <Image
              className="dark:invert"
              src="/github-mark.svg"
              alt="Github logomark"
              width={20}
              height={20}
            />
            Our Github
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/"
            target="_blank"
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
    </div>
  );
}
