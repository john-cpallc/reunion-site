import { google } from "googleapis";
import { connection } from "next/server";
import type { RegisterInput } from "@/lib/register-schema";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    throw new Error(
      "Missing Google Sheets config. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID.",
    );
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { auth, sheetId };
}

export async function appendRegistration(data: RegisterInput) {
  const { auth, sheetId } = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toISOString(),
    data.firstName,
    data.lastName,
    data.preferredName || "",
    data.email,
    data.phone || "",
    data.cityState || "",
    data.gradNote || "2017",
    data.hearAbout || "",
    "web",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "emails!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

export function isSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID,
  );
}

export type PublicClassmate = {
  name: string;
};

function cell(row: string[], index: number) {
  return (row[index] ?? "").trim();
}

function classmateName(first: string, last: string, preferred: string) {
  if (preferred && last) return `${preferred} ${last}`;
  if (preferred) return preferred;
  return [first, last].filter(Boolean).join(" ");
}

/** Names only, in the order people first joined. Emails and phones stay on the sheet. */
export async function listClassmates(): Promise<PublicClassmate[]> {
  await connection();
  if (!isSheetsConfigured()) return [];

  const { auth, sheetId } = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "emails!A:D",
  });

  const rows = response.data.values ?? [];
  const seen = new Map<string, string>();
  const order: string[] = [];

  for (const row of rows) {
    const first = cell(row, 1);
    const last = cell(row, 2);
    const preferred = cell(row, 3);

    if (/^first$/i.test(first) && /^last$/i.test(last)) continue;

    const name = classmateName(first, last, preferred);
    if (!name) continue;

    const key = `${first} ${last}`.trim().toLowerCase() || name.toLowerCase();
    if (!seen.has(key)) order.push(key);
    seen.set(key, name);
  }

  return order.map((key) => ({ name: seen.get(key) ?? key }));
}
