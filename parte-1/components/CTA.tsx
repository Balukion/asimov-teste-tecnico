import Image from "next/image";
import Button from "./Button";

export default function CTA() {
  return (
    <section id="cta" className="px-5 sm:px-8 md:px-section mb-section-b">
      <div className="bg-gray rounded-card px-5 sm:px-8 md:px-section py-8 sm:py-10 md:py-section flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex flex-col gap-[26px] flex-[6]">
          <h2 className="text-[40px] font-medium text-dark leading-tight">
            Let&apos;s make things happen
          </h2>
          <p className="text-[18px] leading-[26px] text-dark/80 max-w-[500px]">
            Contact us today to learn more about how our digital marketing
            services can help your business grow and succeed online.
          </p>
          <div>
            <Button href="#">Get your free proposal</Button>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-[4] flex items-center justify-center md:relative md:self-stretch">
          <Image
            src="/proposal-pic.png"
            alt=""
            width={359}
            height={394}
            quality={80}
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 535px"
            aria-hidden="true"
            style={{ width: "100%", height: "auto" }}
            className="max-w-[280px] sm:max-w-[320px] md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 md:max-w-[535px]"
          />
        </div>
      </div>
    </section>
  );
}
