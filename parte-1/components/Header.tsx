"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className="sticky top-0 z-50 w-full px-5 sm:px-6 md:px-section py-7 flex items-center justify-between bg-white"
    >
      <motion.a
        href="#"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
      >
        <Image src="/Logo.svg" alt="Positivus" width={220} height={36} />
      </motion.a>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="text-[18px] text-dark hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
          >
            {link.label}
          </motion.a>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.55, ease }}
        className="hidden md:block"
      >
        <Button variant="outline" size="sm">
          Request a quote
        </Button>
      </motion.div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-white border-t border-dark/20 z-50 flex flex-col items-center gap-6 py-8 md:hidden shadow-md"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                className="text-[18px] text-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Button variant="outline" size="sm">
                Request a quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
