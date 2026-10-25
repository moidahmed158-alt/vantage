import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/Section";
import { ServiceHero } from "../_detail/ServiceHero";
import { FaqSection, IncludedSection, ProcessSection, RelatedSection, WhySection } from "../_detail/Sections";
import { AccessChecks } from "./AccessChecks";
import { AnswerMock } from "./AnswerMock";
import { BeforeAfter } from "./BeforeAfter";
import { COPY } from "./content";
import { PlainTerms } from "./PlainTerms";
import { SourceExplorer } from "./SourceExplorer";
import { Vocabulary } from "./Vocabulary";

// Copy lives in ./content.tsx.
export const metadata: Metadata = COPY.meta;

export default function AnswerEngineOptimizationPage() {
  return (
    <>
      <ServiceHero copy={COPY.hero} glow="c" orb={{ tone: "cyan", size: 520, right: 0, top: 40 }} visual={<AnswerMock />} />
      <PlainTerms />
      <Vocabulary />
      <SourceExplorer />
      <IncludedSection id="aeo-included" copy={COPY.included} layout="cards" />
      <BeforeAfter />
      <WhySection copy={COPY.why} bg="v-glow-tr" />
      <ProcessSection copy={COPY.process} bg="v-alt" />
      <AccessChecks />
      <RelatedSection copy={COPY.related} bg="v-alt" />
      <FaqSection copy={COPY.faq} />
      <CtaBand {...COPY.cta} alt />
    </>
  );
}
