import { google } from "googleapis";
import { connection } from "next/server";
import type { RegisterInput } from "@/lib/register-schema";

function readEnv(name: string) {
  let value = process.env[name]?.trim() ?? "";
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }
  return value;
}

/** Vercel often stores the PEM with surrounding quotes or literal \n sequences. */
function readPrivateKey() {
  return readEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function readSheetId() {
  const value = readEnv("GOOGLE_SHEET_ID");
  const fromUrl = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return fromUrl?.[1] ?? value;
}

function getAuth() {
  const email = readEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = readPrivateKey();
  const sheetId = readSheetId();

  if (!email || !privateKey || !sheetId) {
    throw new Error(
      `Missing Google Sheets config: ${missingSheetsEnv().join(", ")}`,
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

function missingSheetsEnv() {
  const missing: string[] = [];
  if (!readEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL")) {
    missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  }
  if (!readPrivateKey()) missing.push("GOOGLE_PRIVATE_KEY");
  if (!readSheetId()) missing.push("GOOGLE_SHEET_ID");
  return missing;
}

export function isSheetsConfigured() {
  return missingSheetsEnv().length === 0;
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
  const missing = missingSheetsEnv();
  if (missing.length > 0) {
    throw new Error(`Missing Google Sheets config: ${missing.join(", ")}`);
  }

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
