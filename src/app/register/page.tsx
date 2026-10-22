import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Join the list",
  description:
    "Register as a Huntsville High Class of 2017 alum and join the reunion mailing list.",
};

export default function RegisterPage() {
  return (
    <div className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="font-display text-sm tracking-[0.24em] text-cardinal uppercase">
            Alumni directory
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-wide text-ink uppercase sm:text-6xl">
            Join the list
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Register yourself as a Class of 2017 alum so we can reach you with
            surveys, save-the-date, and ticket updates. Your contact details
            stay with the committee. Your name is added to the running list on
            the People page.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
