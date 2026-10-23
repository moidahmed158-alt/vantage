import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/Section";
import { ServiceHero } from "../_detail/ServiceHero";
import { FaqSection, IncludedSection, ProcessSection, RelatedSection, WhySection } from "../_detail/Sections";
import { COPY, INCLUDED_ID } from "./content";
import { InboxMock } from "./InboxMock";

// Copy lives in ./content.tsx.
export const metadata: Metadata = COPY.meta;

export default function ReputationManagementPage() {
  return (
    <>
      <ServiceHero copy={COPY.hero} glow="tl" orb={{ tone: "cyan", size: 480, right: -100, top: 120 }} visual={<InboxMock />} />
      <IncludedSection id={INCLUDED_ID} copy={COPY.included} layout="cards" bg="v-alt" />
      <WhySection copy={COPY.why} bg="v-glow-tr" />
      <ProcessSection copy={COPY.process} bg="v-alt" />
      <RelatedSection copy={COPY.related} />
      <FaqSection copy={COPY.faq} bg="v-alt" />
      <CtaBand {...COPY.cta} />
    </>
  );
}
