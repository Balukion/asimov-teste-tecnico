"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

const navLinks = [
  { label: "About us",  href: "#" },
  { label: "Services",  href: "#services" },
  { label: "Use Cases", href: "#case-studies" },
  { label: "Pricing",   href: "#" },
  { label: "Blog",      href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close on Escape; return focus to hamburger on close
  useEffect(() => {
    if (!menuOpen) {
      hamburgerRef.current?.focus();
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      role="banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative w-full px-5 sm:px-6 md:px-section h-[68px] flex items-center justify-between bg-white"
    >
      {/* Logo */}
      <motion.a
        href="/"
        aria-label="Positivus — go to homepage"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded shrink-0"
      >
        <Image
          src="/Logo.svg"
          alt="Positivus"
          width={220}
          height={36}
          priority
        />
      </motion.a>

      {/* Desktop: nav links + button grouped (gap 40px between all items, matching Figma Frame 10) */}
      <div className="hidden md:flex items-center gap-10">
        <nav aria-label="Main navigation" className="flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              className="text-[20px] text-black hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.45, ease }}
        >
          <Button variant="outline">Request a quote</Button>
        </motion.div>
      </div>

      {/* Mobile: hamburger */}
      <button
        ref={hamburgerRef}
        className="md:hidden flex flex-col justify-center gap-[5px] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-controls="mobile-menu"
      >
        <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile: dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-white border-t border-dark/10 shadow-md z-40 flex flex-col items-center gap-6 py-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25, ease: "easeOut" }}
                className="text-[20px] text-black hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="outline" onClick={() => setMenuOpen(false)}>
                Request a quote
              </Button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
