"use client";

import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const logos = [
  { name: "Amazon",   src: "/logo-amazon.svg",   href: "https://amazon.com",   w: 124 },
  { name: "Dribbble", src: "/logo-dribbble.svg",  href: "https://dribbble.com", w: 126 },
  { name: "HubSpot",  src: "/logo-hubspot.svg",   href: "https://hubspot.com",  w: 129 },
  { name: "Notion",   src: "/logo-notion.svg",    href: "https://notion.so",    w: 146 },
  { name: "Netflix",  src: "/logo-netflix.svg",   href: "https://netflix.com",  w: 125 },
  { name: "Zoom",     src: "/logo-zoom.svg",      href: "https://zoom.us",      w: 111 },
];

export default function Hero() {
  return (
    <section id="hero" className="px-5 sm:px-8 md:px-section pt-[70px] pb-panel-y">
      <div className="flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="flex-[55] flex flex-col gap-[35px]">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease }}
            className="text-[36px] sm:text-[48px] md:text-[60px] font-medium leading-[1.276]"
          >
            Navigating the digital landscape for success
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="text-[20px] leading-[28px] max-w-[498px]"
          >
            Our digital marketing agency helps businesses grow and succeed online
            through a range of services including SEO, PPC, social media
            marketing, and content creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-fit"
          >
            <Button href="#cta">Book a consultation</Button>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease }}
          className="flex-[45] w-full flex justify-center md:justify-end mt-8 md:mt-0"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/hero-illustration.svg"
              alt="Digital marketing illustration"
              width={600}
              height={515}
              priority
              sizes="(max-width: 640px) 320px, (max-width: 768px) 450px, 600px"
              className="w-full max-w-[320px] sm:max-w-[450px] md:max-w-[600px]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Logo bar */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        className="mt-panel-y py-10 flex flex-wrap justify-between items-center gap-8"
        aria-label="Our clients"
      >
        {logos.map((logo) => (
          <motion.a
            key={logo.name}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            whileHover={{ scale: 1.12 }}
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              width={logo.w}
              height={48}
              className="h-12 w-auto object-contain grayscale transition-[filter] duration-300 hover:grayscale-0"
            />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
