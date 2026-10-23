import { createPrivateKey } from "node:crypto";
import { google } from "googleapis";
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
  let key = readEnv("GOOGLE_PRIVATE_KEY");
  for (let pass = 0; pass < 2; pass += 1) {
    if (
      (key.startsWith('"') && key.endsWith('"')) ||
      (key.startsWith("'") && key.endsWith("'"))
    ) {
      key = key.slice(1, -1).trim();
    }
    if (!key.includes("\\n")) break;
    key = key.replace(/\\n/g, "\n");
  }
  return key.replace(/\r/g, "");
}

export function sheetsFailureReason(error: unknown) {
  const raw = error instanceof Error ? error.message : "The sheet request failed.";
  const key = readPrivateKey();

  if (raw.startsWith("Missing Google Sheets config")) {
    return `The server is missing ${raw.split(": ").slice(1).join(": ")}.`;
  }
  if (key && !key.includes("END PRIVATE KEY")) {
    return "The private key saved in Vercel is incomplete. Paste the whole key as one line, with \\n where each line break was.";
  }
  if (/DECODER|unsupported|invalid_grant|Invalid JWT|ERR_OSSL|private key/i.test(raw)) {
    return "Google could not read the private key. Save it in Vercel as one line, with \\n between the PEM lines.";
  }
  if (/permission|forbidden|403/i.test(raw)) {
    return "The spreadsheet is not shared with the service account email as an editor.";
  }
  if (/not found|404/i.test(raw)) {
    return "GOOGLE_SHEET_ID does not match a spreadsheet this service account can open.";
  }

  const line = raw.split("\n")[0]?.replace(/-----BEGIN[\s\S]*$/, "[key]") ?? raw;
  return line.slice(0, 240);
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

  try {
    createPrivateKey(privateKey);
  } catch {
    throw new Error(
      privateKey.includes("END PRIVATE KEY")
        ? "Invalid private key"
        : "Private key is incomplete",
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
