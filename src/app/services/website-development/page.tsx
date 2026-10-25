import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/Section";
import { ServiceHero } from "../_detail/ServiceHero";
import { FaqSection, IncludedSection, ProcessSection, RelatedSection, WhySection } from "../_detail/Sections";
import { BrowserMock } from "./BrowserMock";
import { COPY, INCLUDED_ID } from "./content";

// Copy lives in ./content.tsx.
export const metadata: Metadata = COPY.meta;

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <ServiceHero copy={COPY.hero} glow="tr" visual={<BrowserMock />} />
      <IncludedSection id={INCLUDED_ID} copy={COPY.included} layout="list" wide bg="v-alt" />
      <WhySection copy={COPY.why} bg="v-glow-tl" />
      <ProcessSection copy={COPY.process} bg="v-alt" />
      <RelatedSection copy={COPY.related} />
      <FaqSection copy={COPY.faq} bg="v-alt" />
      <CtaBand {...COPY.cta} />
    </>
  );
}
