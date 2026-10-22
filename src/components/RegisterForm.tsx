"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/20";

const labelClass = "block text-sm font-medium text-ink";

export function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      preferredName: String(formData.get("preferredName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      cityState: String(formData.get("cityState") ?? ""),
      gradNote: String(formData.get("gradNote") ?? ""),
      hearAbout: String(formData.get("hearAbout") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="animate-rise rounded-sm border border-cardinal/20 bg-white px-6 py-10 text-center shadow-sm"
      >
        <p className="font-display text-3xl tracking-wide text-cardinal">
          You&apos;re on the list
        </p>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thanks for checking in. We&apos;ll email you when dates, surveys, and
          ticket info go live.
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-medium text-blue underline-offset-4 hover:underline"
          onClick={() => setStatus("idle")}
        >
          Register another classmate
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-5 rounded-sm border border-line bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name <span className="text-cardinal">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name <span className="text-cardinal">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredName" className={labelClass}>
          Preferred name / nickname
        </label>
        <input
          id="preferredName"
          name="preferredName"
          autoComplete="nickname"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-cardinal">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cityState" className={labelClass}>
            City / state
          </label>
          <input
            id="cityState"
            name="cityState"
            placeholder="Where are you now?"
            autoComplete="address-level2"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="gradNote" className={labelClass}>
          Graduation year
        </label>
        <input
          id="gradNote"
          name="gradNote"
          defaultValue="2017"
          placeholder="2017 — or note if you attended another year"
          className={fieldClass}
        />
        <p className="mt-1 text-xs text-muted">
          Default is Class of 2017. Add a note if your situation differs.
        </p>
      </div>

      <div>
        <label htmlFor="hearAbout" className={labelClass}>
          How did you hear about this?
        </label>
        <input id="hearAbout" name="hearAbout" className={fieldClass} />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 accent-cardinal"
        />
        <span>
          I agree to receive email updates about the Class of 2017 reunion.{" "}
          <span className="text-cardinal">*</span>
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-sm text-cardinal">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-glow w-full rounded-sm bg-cardinal px-5 py-3 font-display text-lg tracking-wide text-white uppercase transition hover:bg-cardinal-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? "Submitting…" : "Join the list"}
      </button>
    </form>
  );
}
