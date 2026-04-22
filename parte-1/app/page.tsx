import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import CaseStudies from "@/components/CaseStudies";

export default function Home() {
  return (
    <main className="max-w-[1440px] mx-auto">
      <Header />
      <Hero />
      <Suspense fallback={null}>
        <Services />
      </Suspense>
      <Suspense fallback={null}>
        <CTA />
      </Suspense>
      <Suspense fallback={null}>
        <CaseStudies />
      </Suspense>
    </main>
  );
}
