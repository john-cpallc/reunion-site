import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,#d4213d_0%,transparent_45%),radial-gradient(ellipse_at_85%_15%,#2a5298_0%,transparent_40%),linear-gradient(160deg,#7a0b21_0%,#1a3a6b_55%,#141820_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:repeating-linear-gradient(115deg,transparent_0_14px,rgba(255,255,255,0.35)_14px_15px)]"
        />
        <div
          aria-hidden
          className="animate-fade absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-cardinal-bright/25 blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="animate-rise font-display text-sm tracking-[0.28em] text-white/75 uppercase">
            Huntsville High · Class of 2017
          </p>
          <h1 className="animate-rise-delay mt-4 max-w-4xl font-display text-6xl leading-[0.92] font-semibold tracking-[0.04em] text-white uppercase sm:text-7xl md:text-8xl">
            Go Big Red
            <span className="block text-white/80">2027</span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Save the year. Our 10-year reunion is in the works — date TBA.
            Get on the list so you don&apos;t miss the survey, save-the-date, or
            tickets.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="cta-glow rounded-sm bg-white px-6 py-3 font-display text-lg tracking-wide text-cardinal uppercase transition hover:bg-paper"
            >
              Join the list
            </Link>
            <Link
              href="/people"
              className="rounded-sm border border-white/35 px-6 py-3 font-display text-lg tracking-wide text-white uppercase transition hover:border-white hover:bg-white/10"
            >
              People
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <h2 className="font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">
              What&apos;s next
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Phase one is finding classmates. After that we&apos;ll survey the
              class on timing and vibe, lock a venue, and send a proper
              save-the-date. Help us build the directory by registering — and
              share the site with anyone from the Class of 2017.
            </p>
          </div>
          <ul className="space-y-4 border-l-2 border-cardinal pl-5 text-ink">
            <li>
              <span className="font-display text-sm tracking-[0.18em] text-cardinal uppercase">
                Now
              </span>
              <p className="mt-1 text-muted">Build the alumni mailing list</p>
            </li>
            <li>
              <span className="font-display text-sm tracking-[0.18em] text-blue uppercase">
                Soon
              </span>
              <p className="mt-1 text-muted">Class survey on date &amp; format</p>
            </li>
            <li>
              <span className="font-display text-sm tracking-[0.18em] text-muted uppercase">
                2027
              </span>
              <p className="mt-1 text-muted">Reunion weekend — details TBA</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
