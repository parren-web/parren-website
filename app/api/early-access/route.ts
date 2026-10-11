import { NextResponse } from "next/server";
import { signupSchema, CONSENT_VERSION } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { appendSignup, emailExists, SheetsNotConfiguredError } from "@/lib/sheets";

/** 5 signup attempts per IP per 10 minutes */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

export async function POST(req: Request) {
  // 1. Rate limiting (soft, per instance — see lib/rate-limit.ts)
  if (!checkRateLimit(`signup:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  // 2. Parse + validate
  const body = await req.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: firstIssue?.message ?? "Please check your details and try again." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // 3. Honeypot: bots get a fake success so they can't probe the endpoint
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4. Duplicate prevention (case-insensitive email match)
  try {
    if (await emailExists(data.email)) {
      return NextResponse.json(
        { ok: false, error: "This email is already on the early access list — you're all set." },
        { status: 409 }
      );
    }

    await appendSignup([
      new Date().toISOString(),
      data.firstName,
      data.email,
      data.company,
      true,
      CONSENT_VERSION,
      data.utm?.utm_source ?? "",
      data.utm?.utm_medium ?? "",
      data.utm?.utm_campaign ?? "",
      data.utm?.utm_term ?? "",
      data.utm?.utm_content ?? "",
      data.referrer ?? "",
      data.landingPage ?? "",
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof SheetsNotConfiguredError) {
      console.error("[early-access] Sheets credentials missing");
      return NextResponse.json(
        { ok: false, error: "Signups are temporarily unavailable. Please try again soon." },
        { status: 503 }
      );
    }
    console.error("[early-access] Sheets write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again in a moment." },
      { status: 500 }
    );
  }
}
