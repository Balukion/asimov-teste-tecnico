import Image from "next/image";
import Button from "./Button";

const logos = [
  { name: "Amazon", src: "/logo-amazon.svg", href: "https://amazon.com" },
  { name: "Dribbble", src: "/logo-dribbble.svg", href: "https://dribbble.com" },
  { name: "HubSpot", src: "/logo-hubspot.svg", href: "https://hubspot.com" },
  { name: "Notion", src: "/logo-notion.svg", href: "https://notion.so" },
  { name: "Netflix", src: "/logo-netflix.svg", href: "https://netflix.com" },
  { name: "Zoom", src: "/logo-zoom.svg", href: "https://zoom.us" },
];

export default function Hero() {
  return (
    <section id="hero" className="px-5 sm:px-8 md:px-section pt-6 pb-panel-y">
      {/* Main hero row */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Text — ~55% */}
        <div className="flex-[55] flex flex-col gap-[35px]">
          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-medium leading-[1.1]">
            Navigating the digital landscape for success
          </h1>
          <p className="text-[18px] leading-[28px] max-w-[450px]">
            Our digital marketing agency helps businesses grow and succeed online
            through a range of services including SEO, PPC, social media
            marketing, and content creation.
          </p>
          <div>
            <Button href="#cta">Book a consultation</Button>
          </div>
        </div>

        {/* Illustration — ~45% */}
        <div className="flex-[45] w-full flex justify-center md:justify-end mt-8 md:mt-0">
          <Image
            src="/hero-illustration.svg"
            alt="Digital marketing illustration"
            width={601}
            height={515}
            priority
            sizes="(max-width: 640px) 320px, (max-width: 768px) 450px, 601px"
            className="w-full max-w-[320px] sm:max-w-[450px] md:max-w-[601px]"
          />
        </div>
      </div>

      {/* Logo bar */}
      <div className="mt-panel-y py-10 flex flex-wrap justify-between items-center gap-8">
        {logos.map((logo) => (
          <a
            key={logo.name}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark rounded"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={130}
              height={48}
              sizes="130px"
              className="h-8 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
