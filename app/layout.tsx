import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parren.ai — Your 24/7 Social Media Manager",
  description:
    "Parren turns your raw footage into edited videos, scroll-stopping captions, and a posting rhythm that never sleeps. Join early access.",
  metadataBase: new URL("https://parren.ai"),
  openGraph: {
    title: "Parren.ai — Your 24/7 Social Media Manager",
    description:
      "You film. Parren does the rest. Join early access to your 24/7 social media manager for founders, creators, and personal brands.",
    url: "https://parren.ai",
    siteName: "Parren.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parren.ai — Your 24/7 Social Media Manager",
    description: "You film. Parren does the rest. Join early access.",
  },
};

export const viewport = {
  themeColor: "#0a0f1e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
