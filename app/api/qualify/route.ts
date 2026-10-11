import { NextResponse } from "next/server";
import { qualifySchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { appendQualification, SheetsNotConfiguredError } from "@/lib/sheets";

/** 10 questionnaire submissions per IP per 10 minutes */
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

export async function POST(req: Request) {
  if (!checkRateLimit(`qualify:${clientIp(req)}`, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = qualifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your answers and try again." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  try {
    await appendQualification([
      new Date().toISOString(),
      data.email,
      data.platforms.join(", "),
      data.postingFrequency,
      data.handoff,
      data.companySize,
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof SheetsNotConfiguredError) {
      console.error("[qualify] Sheets credentials missing");
      return NextResponse.json(
        { ok: false, error: "Couldn't save your answers right now." },
        { status: 503 }
      );
    }
    console.error("[qualify] Sheets write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Couldn't save your answers right now." },
      { status: 500 }
    );
  }
}
