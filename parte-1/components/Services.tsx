"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

type Service = {
  title: string;
  slug: string;
  bgClass: "bg-gray" | "bg-green" | "bg-dark";
  badgeClass: "bg-green" | "bg-white";
  dark: boolean;
  img: string;
};

const services: Service[] = [
  { title: "Search engine\noptimization", slug: "seo",          bgClass: "bg-gray",  badgeClass: "bg-green", dark: false, img: "/card-seo.png" },
  { title: "Pay-per-click\nadvertising",  slug: "ppc",          bgClass: "bg-green", badgeClass: "bg-white", dark: false, img: "/card-ppc.png" },
  { title: "Social Media\nMarketing",     slug: "social-media", bgClass: "bg-dark",  badgeClass: "bg-white", dark: true,  img: "/card-social.png" },
  { title: "Email\nMarketing",            slug: "email",        bgClass: "bg-gray",  badgeClass: "bg-green", dark: false, img: "/card-email.png" },
  { title: "Content\nCreation",           slug: "content",      bgClass: "bg-green", badgeClass: "bg-white", dark: false, img: "/card-content.png" },
  { title: "Analytics and\nTracking",     slug: "analytics",    bgClass: "bg-dark",  badgeClass: "bg-white", dark: true,  img: "/card-analytics.png" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function ArrowButton({ dark }: { dark: boolean }) {
  return (
    <span
      className={`flex items-center justify-center w-[41px] h-[41px] rounded-full shrink-0 ${dark ? "bg-white" : "bg-dark"}`}
      aria-hidden="true"
    >
      <Image
        src="/arrow-icon.svg"
        alt=""
        width={21}
        height={20}
        className={dark ? "brightness-0" : ""}
      />
    </span>
  );
}

export default function Services() {
  return (
    <section id="services" className="px-5 sm:px-8 md:px-section mb-section-b">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease }}
        className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-[80px]"
      >
        <h2 className="bg-green text-dark text-[32px] sm:text-[36px] md:text-[40px] font-medium rounded-[7px] px-[7px] leading-tight shrink-0">
          Services
        </h2>
        <p className="text-[18px] leading-[26px] max-w-[580px]">
          At our digital marketing agency, we offer a range of services to help
          businesses grow and succeed online. These services include:
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-[40px]"
      >
        {services.map((service) => (
          <motion.article
            key={service.slug}
            id={`service-${service.slug}`}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.25 } }}
            className={`flex flex-row rounded-card border border-dark shadow-card px-5 sm:px-8 md:px-card-p py-6 sm:py-8 md:py-card-p md:min-h-[310px] cursor-pointer ${service.bgClass}`}
          >
            {/* Left: title + link */}
            <div className="flex flex-col justify-between flex-[5]">
              <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-medium leading-[1.20]">
                {service.title.split("\n").map((line, j) => (
                  <span key={j} className="block">
                    <span className={`px-[7px] rounded-[7px] text-dark ${service.badgeClass}`}>
                      {line}
                    </span>
                  </span>
                ))}
              </h3>

              <motion.a
                href={`#service-${service.slug}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-3 text-[20px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded ${service.dark ? "text-white" : "text-dark"}`}
                aria-label={`Learn more about ${service.title.replace("\n", " ")}`}
              >
                <ArrowButton dark={service.dark} />
                Learn more
              </motion.a>
            </div>

            {/* Right: illustration */}
            <motion.div
              whileHover={{ rotate: 3, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex-[5] flex items-center justify-center"
            >
              <Image
                src={service.img}
                alt=""
                aria-hidden="true"
                width={210}
                height={210}
                quality={80}
                sizes="210px"
                style={{ width: "100%", height: "auto", maxWidth: "210px" }}
                className="object-contain"
              />
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
