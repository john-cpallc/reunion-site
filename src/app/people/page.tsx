import type { Metadata } from "next";
import { Suspense } from "react";
import { ClassmateList } from "@/components/ClassmateList";
import {
  committeeIntro,
  committeeMembers,
  helpEmail,
} from "@/data/committee";

export const metadata: Metadata = {
  title: "People",
  description:
    "The Class of 2017 committee and the classmates already on the reunion list.",
};

export default function PeoplePage() {
  return (
    <div className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm tracking-[0.24em] text-cardinal uppercase">
          Class of 2017
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-ink uppercase sm:text-6xl">
          People
        </h1>

        <section className="mt-12">
          <h2 className="font-display text-3xl tracking-wide text-ink uppercase">
            Committee
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {committeeIntro}
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {committeeMembers.map((member) => (
              <li
                key={member.role}
                className="border-t-2 border-cardinal bg-white px-5 py-6 shadow-sm"
              >
                <p className="font-display text-2xl tracking-wide text-ink uppercase">
                  {member.role}
                </p>
                <p className="mt-2 text-sm tracking-wide text-muted uppercase">
                  {member.name}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-muted">
            The committee isn&apos;t adding members. If you want to help, email{" "}
            <a
              href={`mailto:${helpEmail}`}
              className="font-medium text-cardinal underline-offset-4 hover:underline"
            >
              {helpEmail}
            </a>
            .
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl tracking-wide text-ink uppercase">
            Classmates
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            A running list of people who have joined. Only names are shown.
          </p>
          <Suspense
            fallback={<p className="mt-6 text-muted">Loading the list…</p>}
          >
            <ClassmateList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
