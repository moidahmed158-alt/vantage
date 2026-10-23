import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/Section";
import { ServiceHero } from "../_detail/ServiceHero";
import { FaqSection, IncludedSection, ProcessSection, RelatedSection, WhySection } from "../_detail/Sections";
import { COPY, INCLUDED_ID } from "./content";
import { SearchMock } from "./SearchMock";

// Copy lives in ./content.tsx.
export const metadata: Metadata = COPY.meta;

export default function HealthcareSeoPage() {
  return (
    <>
      <ServiceHero copy={COPY.hero} glow="tr" orb={{ tone: "blue", size: 560, right: -100, top: -80 }} visual={<SearchMock />} />
      <IncludedSection id={INCLUDED_ID} copy={COPY.included} layout="list" bg="v-alt" />
      <WhySection copy={COPY.why} bg="v-glow-tl" />
      <ProcessSection copy={COPY.process} bg="v-alt" />
      <RelatedSection copy={COPY.related} />
      <FaqSection copy={COPY.faq} bg="v-alt" />
      <CtaBand {...COPY.cta} />
    </>
  );
}
