import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/Section";
import { ServiceHero } from "../_detail/ServiceHero";
import { FaqSection, IncludedSection, RelatedSection, WhySection } from "../_detail/Sections";
import { COPY } from "./content";
import { Photography } from "./Photography";
import { ShootDay } from "./ShootDay";
import { VideoMock } from "./VideoMock";
import { VideoTypes } from "./VideoTypes";

// Copy lives in ./content.tsx.
export const metadata: Metadata = COPY.meta;

export default function VideoPhotographyPage() {
  return (
    <>
      <ServiceHero copy={COPY.hero} glow="tl" orb={{ tone: "blue", size: 500, right: -80, top: 80 }} visual={<VideoMock />} />
      <IncludedSection copy={COPY.principles} layout="cards" bg="v-alt" />
      <ShootDay />
      <VideoTypes />
      <WhySection copy={COPY.why} bg="v-glow-tl" />
      <Photography />
      <IncludedSection copy={COPY.cost} layout="list" />
      <RelatedSection copy={COPY.related} bg="v-alt" />
      <FaqSection copy={COPY.faq} />
      <CtaBand {...COPY.cta} alt />
    </>
  );
}
