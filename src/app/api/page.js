import Image from "next/image";
import markdownit from 'markdown-it';

export default async function APIPage() {
  const response = await fetch('https://raw.githubusercontent.com/Minehut-Improvements/api/refs/heads/main/README.md?token=GHSAT0AAAAAAC25HPOV7TOQBK23Z3P6IL72Z3JXMBA');
  const markdown = await response.text();

  const md = markdownit();
  const result = md.render(markdown);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="row-start-0 flex gap-3 mt-4 flex-wrap items-center justify-center">
        <a
          className="no-underline hover:underline rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
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
          className="no-underline hover:underline rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
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
          className="no-underline hover:underline rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-black hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 flex items-center gap-2 hover:underline hover:underline-offset-4"
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
      
      <main className="prose prose-lg max-w-4xl text-white text-left">
        <div dangerouslySetInnerHTML={{ __html: result }} />
      </main>
    </div>
  );
}
