import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about the Huntsville High Class of 2017 reunion — timing, tickets, guests, and how to help.",
};

export default function FaqPage() {
  return (
    <div className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-sm tracking-[0.24em] text-cardinal uppercase">
          Questions
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-ink uppercase sm:text-6xl">
          FAQ
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Early answers while planning is underway. More detail will land here
          as we lock dates and venue.
        </p>

        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>

        <p className="mt-10 text-muted">
          Still have a question?{" "}
          <Link
            href="/register"
            className="font-medium text-cardinal underline-offset-4 hover:underline"
          >
            Join the mailing list
          </Link>{" "}
          and we&apos;ll keep you posted — or see the{" "}
          <a
            href="https://www.huntsvillecityschools.org/o/hhs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue underline-offset-4 hover:underline"
          >
            official HHS site
          </a>{" "}
          for school information.
        </p>
      </div>
    </div>
  );
}
