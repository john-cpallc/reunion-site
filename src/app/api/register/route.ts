import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/register-schema";
import { appendRegistration, isSheetsConfigured } from "@/lib/sheets";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Honeypot tripped — pretend success
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isSheetsConfigured()) {
    console.error("Registration received but Google Sheets is not configured.");
    return NextResponse.json(
      {
        error:
          "Registration is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  try {
    await appendRegistration(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to append registration:", error);
    return NextResponse.json(
      { error: "Could not save your registration. Please try again." },
      { status: 500 },
    );
  }
}
