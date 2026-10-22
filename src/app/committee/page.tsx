import type { Metadata } from "next";
import Link from "next/link";
import {
  committeeIntro,
  committeeMembers,
  openRoles,
} from "@/data/committee";

export const metadata: Metadata = {
  title: "Committee",
  description:
    "Meet the volunteer alumni organizing the Huntsville High Class of 2017 reunion.",
};

export default function CommitteePage() {
  return (
    <div className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm tracking-[0.24em] text-cardinal uppercase">
          Organizers
        </p>
        <h1 className="mt-3 font-display text-5xl tracking-wide text-ink uppercase sm:text-6xl">
          The committee
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {committeeIntro}
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {committeeMembers.map((member) => (
            <li
              key={member.name}
              className="border-t-2 border-cardinal bg-white px-5 py-6 shadow-sm"
            >
              <p className="font-display text-2xl tracking-wide text-ink uppercase">
                {member.name}
              </p>
              <p className="mt-2 text-sm tracking-wide text-blue uppercase">
                {member.role}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 max-w-2xl">
          <h2 className="font-display text-3xl tracking-wide text-ink uppercase">
            Roles we&apos;re filling
          </h2>
          <p className="mt-3 text-muted">
            Titles will be assigned as people step up. Open seats include:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {openRoles.map((role) => (
              <li
                key={role}
                className="rounded-sm border border-line bg-paper-warm px-3 py-1.5 text-sm text-ink"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted">
            Want to help?{" "}
            <Link
              href="/register"
              className="font-medium text-cardinal underline-offset-4 hover:underline"
            >
              Join the list
            </Link>{" "}
            and mention that you&apos;d like to volunteer — or talk to someone
            already on the committee.
          </p>
        </div>
      </div>
    </div>
  );
}
