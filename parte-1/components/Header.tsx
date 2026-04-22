"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";

const navLinks = [
  { label: "About us",  href: "#" },
  { label: "Services",  href: "#services" },
  { label: "Use Cases", href: "#case-studies" },
  { label: "Pricing",   href: "#" },
  { label: "Blog",      href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full px-5 sm:px-6 md:px-section py-7 flex items-center justify-between bg-white shadow-sm">
      <a
        href="#"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
      >
        <Image src="/Logo.svg" alt="Positivus" width={220} height={36} />
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[18px] text-dark hover:underline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Button variant="outline" size="sm" className="hidden md:inline-block">
        Request a quote
      </Button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 w-full bg-white border-t border-dark/20 z-50 flex flex-col items-center gap-6 py-8 md:hidden shadow-md"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[18px] text-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline" size="sm">
            Request a quote
          </Button>
        </div>
      )}
    </header>
  );
}
