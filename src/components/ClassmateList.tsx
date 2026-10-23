import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { connection } from "next/server";
import { listClassmates } from "@/lib/sheets";

export async function ClassmateList() {
  // Must stay outside the try. During prerender, connection() rejects so
  // React can postpone this subtree. Catching that rejection renders the
  // "unavailable" state into the static shell.
  await connection();

  let names: string[] = [];
  let unavailable = false;

  try {
    names = (await listClassmates()).map((classmate) => classmate.name);
  } catch (error) {
    unstable_rethrow(error);
    console.error("Failed to load classmate list:", error);
    unavailable = true;
  }

  if (unavailable) {
    return (
      <p className="mt-6 text-muted">The class list is unavailable right now.</p>
    );
  }

  if (names.length === 0) {
    return (
      <p className="mt-6 text-muted">
        No classmates on the list yet.{" "}
        <Link
          href="/register"
          className="font-medium text-cardinal underline-offset-4 hover:underline"
        >
          Join the list
        </Link>{" "}
        and your name will show up here.
      </p>
    );
  }

  return (
    <ol className="mt-8 columns-1 gap-x-12 sm:columns-2">
      {names.map((name, index) => (
        <li
          key={`${name}-${index}`}
          className="break-inside-avoid border-b border-line py-3 text-lg text-ink"
        >
          {name}
        </li>
      ))}
    </ol>
  );
}
