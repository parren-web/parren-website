import { google } from "googleapis";

/**
 * Google Sheets storage for early-access leads.
 *
 * Auth: a Google Cloud service account whose JSON key is stored in
 * server-side env vars (never exposed to the browser). The service
 * account email must be added as an Editor on the spreadsheet.
 *
 * Expected workbook tabs (created once, see README):
 *   "Signups"       — one row per registration
 *   "Qualification" — one row per questionnaire submission, keyed by email
 */

export class SheetsNotConfiguredError extends Error {
  constructor() {
    super("Google Sheets credentials are not configured.");
    this.name = "SheetsNotConfiguredError";
  }
}

type SheetsContext = {
  sheets: ReturnType<typeof google.sheets>;
  spreadsheetId: string;
};

let cached: SheetsContext | null = null;

function getContext(): SheetsContext {
  if (cached) return cached;

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new SheetsNotConfiguredError();
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  cached = { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
  return cached;
}

export const SIGNUP_HEADERS = [
  "Timestamp",
  "First Name",
  "Email",
  "Company",
  "Consent Given",
  "Consent Version",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Term",
  "UTM Content",
  "Referrer",
  "Landing Page",
];

export const QUALIFICATION_HEADERS = [
  "Timestamp",
  "Email",
  "Platforms",
  "Posting Frequency",
  "Wants To Hand Off",
  "Company Size",
];

/** Case-insensitive duplicate check against the Email column of "Signups". */
export async function emailExists(email: string): Promise<boolean> {
  const { sheets, spreadsheetId } = getContext();
  const normalized = email.trim().toLowerCase();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Signups!C2:C",
  });

  const rows = res.data.values ?? [];
  return rows.some((row) => (row[0] ?? "").toString().trim().toLowerCase() === normalized);
}

export async function appendSignup(row: (string | boolean)[]): Promise<void> {
  const { sheets, spreadsheetId } = getContext();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Signups!A:M",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}

export async function appendQualification(row: string[]): Promise<void> {
  const { sheets, spreadsheetId } = getContext();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Qualification!A:F",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}
