import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { profile } from "./lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-website-six-pink-95.vercel.app"),
  title: { default: "Leo Goldstein | Software Developer", template: "%s | Leo Goldstein" },
  description: "Computer Science student at Purdue Indianapolis building games, interactive web applications, and backend APIs. Explore Leo Goldstein’s projects and code.",
  openGraph: { type: "website", locale: "en_US", siteName: "Leo Goldstein", title: "Leo Goldstein | Software Developer", description: "Games, web applications, and backend APIs. Selected work by a Computer Science student at Purdue Indianapolis.", images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Leo Goldstein, software developer and Computer Science student at Purdue Indianapolis" }] },
  twitter: { card: "summary_large_image", title: "Leo Goldstein | Software Developer", description: "Games, web applications, and backend APIs.", images: ["/social-preview.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Navbar />{children}<footer className="site-footer"><div><Link href="/" className="footer-name">Leo Goldstein<span>.</span></Link><p>Built with Next.js & TypeScript.</p></div><div className="footer-links"><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a><a href={`mailto:${profile.email}`}>Email</a></div></footer></body></html>;
}
