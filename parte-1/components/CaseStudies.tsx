import clsx from "clsx";
import Image from "next/image";

const cases = [
  {
    slug: "restaurant",
    text: "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
  },
  {
    slug: "b2b-software",
    text: "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
  },
  {
    slug: "retail-chain",
    text: "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="px-5 sm:px-8 md:px-section mb-section-b">
      {/* Section header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-[80px]">
        <h2 className="bg-green text-dark text-[32px] sm:text-[36px] md:text-[40px] font-medium rounded-[7px] px-[7px] leading-tight shrink-0">
          Case Studies
        </h2>
        <p className="text-[18px] leading-[26px] max-w-[580px]">
          Explore Real-Life Examples of Our Proven Digital Marketing Success
          through Our Case Studies
        </p>
      </div>

      {/* Panel */}
      <div className="bg-dark rounded-card px-5 sm:px-8 md:px-section py-10 sm:py-14 md:py-panel-y">
        <div className="flex flex-col md:flex-row gap-0">
          {cases.map((c, i) => (
            <div
              key={c.slug}
              className={clsx(
                "flex-1 flex flex-col justify-between gap-5 py-6 sm:py-8 md:py-0 md:px-16",
                i > 0 && "border-t md:border-t-0 md:border-l border-white/50",
                i === 0 && "md:pl-0",
                i === cases.length - 1 && "md:pr-0 pb-0",
              )}
            >
              <p className="text-[18px] leading-[26px] text-white">{c.text}</p>
              <a
                href="#case-studies"
                className="flex items-center gap-2 text-[20px] font-medium text-green hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green rounded"
              >
                Learn more
                <Image
                  src="/arrow-icon.svg"
                  alt=""
                  aria-hidden="true"
                  width={21}
                  height={20}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
