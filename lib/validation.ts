import { z } from "zod";

/**
 * Version of the consent language shown on the signup form.
 * Bump this any time the consent copy changes, so the sheet records
 * exactly what each person agreed to (useful for CASL compliance).
 */
export const CONSENT_VERSION = "v1-2026-10-11";

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address.")
  .max(254);

const utmSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
  })
  .partial()
  .optional();

export const signupSchema = z.object({
  // Email-first funnel: name/company are collected in the optional
  // post-signup questionnaire, not here. Kept optional for compatibility.
  firstName: z.string().trim().max(60).optional().default(""),
  email: emailField,
  company: z.string().trim().max(120).optional().default(""),
  // CASL express consent: must be an explicit opt-in (true).
  consent: z.literal(true, {
    error: "Marketing consent is required to join early access.",
  }),
  // Honeypot — legitimate users never fill this in. Allowed through validation
  // so the route can return a fake success (bots can't probe the endpoint).
  website: z.string().max(500).optional(),
  utm: utmSchema,
  referrer: z.string().max(500).optional(),
  landingPage: z.string().max(500).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const qualifySchema = z.object({
  email: emailField,
  firstName: z.string().trim().max(60).optional().default(""),
  company: z.string().trim().max(120).optional().default(""),
  industry: z.string().max(80).optional().default(""),
  handle: z.string().trim().max(120).optional().default(""),
  platforms: z.array(z.string().max(40)).max(8).optional().default([]),
  currentFrequency: z.string().max(60).optional().default(""),
  desiredFrequency: z.string().max(60).optional().default(""),
  bottleneck: z.string().trim().max(500).optional().default(""),
  budget: z.string().max(60).optional().default(""),
  betaInterest: z.boolean().optional().default(false),
});

export type QualifyInput = z.infer<typeof qualifySchema>;
