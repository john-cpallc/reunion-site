import { google } from "googleapis";
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
