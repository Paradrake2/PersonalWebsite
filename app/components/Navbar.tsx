"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/app/lib/profile";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [{ href: "/projects", label: "Projects" }, { href: "/aboutme", label: "About" }, { href: "/contact", label: "Contact" }];
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Leo Goldstein home"><span className="brand-mark" aria-hidden="true">lg<span>.</span></span><span>Leo Goldstein</span></Link>
        <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={open} aria-controls="navigation-links" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
        <div id="navigation-links" className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map(link => <Link href={link.href} key={link.href} aria-current={pathname === link.href || pathname.startsWith(link.href + "/") ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <a href={profile.resume} className="nav-resume" onClick={() => setOpen(false)}>Request résumé</a>
        </div>
      </nav>
    </header>
  );
}
