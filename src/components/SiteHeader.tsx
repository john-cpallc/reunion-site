"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/committee", label: "Committee" },
  { href: "/faq", label: "FAQ" },
  { href: "/register", label: "Join the list" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header
      className={
        onHome
          ? "absolute inset-x-0 top-0 z-20"
          : "sticky top-0 z-20 border-b border-white/10 bg-cardinal-deep/95 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.08em] text-white uppercase transition-opacity hover:opacity-90"
        >
          Go Big Red <span className="text-white/70">2027</span>
        </Link>
        <nav
          aria-label="Main"
          className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-white/85"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            const isCta = link.href === "/register";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isCta
                    ? "rounded-sm bg-white px-3 py-1.5 text-cardinal transition hover:bg-paper"
                    : active
                      ? "text-white underline decoration-white/40 underline-offset-4"
                      : "transition hover:text-white"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
