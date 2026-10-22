import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl tracking-[0.06em] text-white uppercase">
            Go Big Red 2027
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">
            Huntsville High School · Class of 2017 · Independent alumni reunion
            hub
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <Link href="/register" className="text-white transition hover:text-cardinal-bright">
            Join the mailing list
          </Link>
          <Link href="/faq" className="transition hover:text-white">
            FAQ
          </Link>
          <a
            href="https://www.huntsvillecityschools.org/o/hhs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Huntsville High School (official)
          </a>
        </div>
      </div>
    </footer>
  );
}
