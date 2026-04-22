"use client";

import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export default function CTA() {
  return (
    <section id="cta" className="px-5 sm:px-8 md:px-section mb-section-b">
      {/* outer wrapper: overflow-visible so illustration can bleed out */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="bg-gray rounded-card px-5 sm:px-8 md:px-panel-x py-8 sm:py-10 md:py-[60px] flex flex-col md:flex-row items-center"
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex flex-col gap-[26px] shrink-0 max-w-[500px]"
          >
            <h2 className="text-[30px] font-medium text-dark leading-[38.28px]">
              Let&apos;s make things happen
            </h2>
            <p className="text-[18px] leading-[26px] text-dark">
              Contact us today to learn more about how our digital marketing
              services can help your business grow and succeed online.
            </p>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-fit"
            >
              <Button href="#">Get your free proposal</Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Illustration — positioned absolute, overflows the card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="hidden md:block absolute"
          style={{ top: "-24px", right: "135px", height: "394px" }}
        >
          <Image
            src="/cta-illustration.svg"
            alt=""
            width={359}
            height={394}
            aria-hidden="true"
            style={{ height: "100%", width: "auto" }}
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
