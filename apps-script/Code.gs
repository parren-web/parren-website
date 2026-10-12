/**
 * Parren early-access lead capture endpoint.
 *
 * SETUP
 * 1. Go to https://script.google.com → New project, paste this file.
 * 2. Project Settings → Script Properties, add:
 *      SHEET_ID      = the spreadsheet ID ("Parren Early Access Leads")
 *      SHARED_SECRET = a long random string (e.g. from: openssl rand -hex 32)
 * 3. Deploy → New deployment → type "Web app":
 *      Execute as: Me
 *      Who has access: Anyone        (required — the Next.js server can't do a Google login;
 *                                     the SHARED_SECRET is what gates access)
 * 4. Copy the Web app URL (…/exec). After ANY code change: Deploy → Manage
 *    deployments → edit → create a New version, or changes won't take effect.
 *
 * SECURITY NOTES
 * - Runs as your Google account: no service-account keys exist to leak or rotate.
 * - Every request must carry the correct SHARED_SECRET or it is rejected.
 * - This script can ONLY append rows to the two named tabs (least privilege by code).
 * - The /exec URL + secret live in server env vars (Vercel), never in client code.
 */

// Signups columns A:M
var SIGNUP_TAB = "Signups";
// Qualification columns A:L
var QUALIFY_TAB = "Qualification";

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty("SHARED_SECRET");
    var sheetId = props.getProperty("SHEET_ID");
    if (!secret || !sheetId) {
      return json({ ok: false, error: "not_configured" });
    }

    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      return json({ ok: false, error: "bad_request" });
    }
    if (body.secret !== secret) {
      return json({ ok: false, error: "unauthorized" });
    }

    var ss = SpreadsheetApp.openById(sheetId);
    if (body.type === "signup") {
      return handleSignup(ss, body.row);
    }
    if (body.type === "qualify") {
      return handleQualify(ss, body.row);
    }
    return json({ ok: false, error: "bad_request" });
  } catch (err) {
    return json({ ok: false, error: "server_error" });
  }
}

function handleSignup(ss, row) {
  // row: [timestamp, firstName, email, company, consentGiven, consentVersion,
  //       utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer, landingPage]
  var sheet = ss.getSheetByName(SIGNUP_TAB);
  if (!sheet) return json({ ok: false, error: "not_configured" });

  var email = String(row && row[2] ? row[2] : "").trim().toLowerCase();
  if (!email) return json({ ok: false, error: "bad_request" });

  // Case-insensitive duplicate check on the Email column (C).
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var emails = sheet
      .getRange(2, 3, lastRow - 1, 1)
      .getValues()
      .map(function (r) {
        return String(r[0]).trim().toLowerCase();
      });
    if (emails.indexOf(email) !== -1) {
      return json({ ok: false, error: "duplicate" });
    }
  }

  sheet.appendRow(row);
  return json({ ok: true });
}

function handleQualify(ss, row) {
  // row: [timestamp, email, firstName, company, industry, handle, platforms,
  //       currentFrequency, desiredFrequency, bottleneck, budget, betaInterest]
  var sheet = ss.getSheetByName(QUALIFY_TAB);
  if (!sheet) return json({ ok: false, error: "not_configured" });
  sheet.appendRow(row);
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
