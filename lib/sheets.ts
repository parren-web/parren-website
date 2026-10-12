/**
 * Lead storage via a Google Apps Script web app endpoint.
 *
 * Why Apps Script instead of a service account: the Google Workspace org
 * policy `iam.disableServiceAccountKeyCreation` blocks key creation, and we
 * deliberately do not weaken it. The script runs as the site owner's Google
 * account, so no keys exist to leak or rotate. Every request is gated by a
 * shared secret that lives only in server-side env vars.
 *
 * Env vars (server-side only, never exposed to the browser):
 *   PARREN_SHEETS_ENDPOINT  — the Apps Script Web app /exec URL
 *   PARREN_SHEETS_SECRET    — the SHARED_SECRET Script Property value
 *
 * The endpoint performs the duplicate-email check and the append itself.
 */

export class SheetsNotConfiguredError extends Error {
  constructor() {
    super("Sheets endpoint is not configured");
    this.name = "SheetsNotConfiguredError";
  }
}

// Signups sheet columns (A:M)
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

// Qualification sheet columns (A:L)
export const QUALIFICATION_HEADERS = [
  "Timestamp",
  "Email",
  "First Name",
  "Company",
  "Industry",
  "Website / Handle",
  "Platforms",
  "Current Posting Frequency",
  "Desired Posting Frequency",
  "Biggest Bottleneck",
  "Monthly Budget",
  "Beta Interest",
];

type RowValue = string | boolean;

type EndpointResponse = {
  ok: boolean;
  error?: string;
};

function getConfig(): { endpoint: string; secret: string } {
  const endpoint = process.env.PARREN_SHEETS_ENDPOINT;
  const secret = process.env.PARREN_SHEETS_SECRET;
  if (!endpoint || !secret) {
    throw new SheetsNotConfiguredError();
  }
  return { endpoint, secret };
}

async function callEndpoint(
  type: "signup" | "qualify",
  row: RowValue[]
): Promise<EndpointResponse> {
  const { endpoint, secret } = getConfig();
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, type, row }),
    });
  } catch {
    throw new Error("Sheets endpoint unreachable");
  }
  if (!res.ok) {
    throw new Error(`Sheets endpoint returned HTTP ${res.status}`);
  }
  return (await res.json()) as EndpointResponse;
}

export type SignupResult = { ok: true } | { ok: false; duplicate: boolean };

/** Submits a signup row. The endpoint dedupes on email (case-insensitive). */
export async function submitSignup(row: RowValue[]): Promise<SignupResult> {
  const data = await callEndpoint("signup", row);
  if (data.ok) return { ok: true };
  return { ok: false, duplicate: data.error === "duplicate" };
}

/** Appends a qualification row. */
export async function submitQualification(row: RowValue[]): Promise<void> {
  const data = await callEndpoint("qualify", row);
  if (!data.ok) {
    throw new Error(`Qualification submit failed: ${data.error ?? "unknown"}`);
  }
}
