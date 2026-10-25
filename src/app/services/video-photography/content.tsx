import type { ReactNode } from "react";
import { Ph } from "@/components/ui/Flag";
import { ROUTES } from "@/lib/site";
import type { BlockCopy, Point, ServiceCopy } from "../_detail/types";

// All copy for /services/video-photography, in page order.
// The shared sections (principles, why, cost, related, FAQ) use the _detail components; the shoot-day tabs,
// video types and photography sections are this page's own (SHOOT_DAY, VIDEO_TYPES, PHOTO below).
// The hero mock UI copy is in MOCK at the end.

/** Jump target for the hero's "What we film" button. */
export const TYPES_ID = "video-types";

export const COPY: Pick<ServiceCopy, "meta" | "hero" | "why" | "related" | "faq" | "cta"> & {
  principles: BlockCopy<Point>;
  cost: BlockCopy<Point>;
} = {
  meta: {
    title: "Healthcare Video & Photography",
    description:
      "On-site video and photography for medical and dental practices — provider interviews, treatment explainers, patient stories and practice photos, edited for your website, ads, reels and Google Business Profile.",
  },

  hero: {
    crumb: "Video & Photography",
    eyebrow: "Be chosen · Video & photography",
    title: (
      <>
        Real faces. Real rooms. <span className="v-grad">Filmed at your practice</span>.
      </>
    ),
    lead: "Patients want to see who they'll meet before they book. One planned shoot day at your office gives you provider interviews, treatment explainers, office footage and photography — edited for your website, ads, reels and Google Business Profile.",
    primary: { label: "Plan a shoot day", href: ROUTES.contact },
    secondary: { label: "What we film", href: `#${TYPES_ID}` },
  },

  principles: {
    eyebrow: "Made for patients, not awards",
    title: "Video that looks like your practice — because it is.",
    lead: "Stock footage tells patients nothing. Short, honest video of your providers and your office answers the question every new patient has: what will it actually be like?",
    items: [
      {
        title: "Filmed at your office",
        body: "No studios and no actors. A small crew brings light and sound to your practice and works around your patient schedule.",
      },
      {
        title: "Edited by our team",
        body: "Captions, cuts and every size you need — website, ads, reels and profiles — all from the same footage.",
      },
      {
        title: "Measured by bookings",
        body: "Videos go where patients make decisions, and the calls and booking requests from those pages are tracked.",
      },
    ],
  },

  why: {
    eyebrow: "Why healthcare is different",
    title: (
      <>
        Medical video has rules <span className="v-neon">other video doesn&apos;t</span>.
      </>
    ),
    items: [
      {
        title: "Privacy and consent come first",
        body: "Everyone on camera signs a release, charts and screens stay out of frame, and patient stories are filmed only with written consent.",
      },
      {
        title: "Your providers sign off on accuracy",
        body: "Nothing about a treatment is published until the provider who performs it has approved the cut.",
      },
      {
        title: "Captions on every video",
        body: "Most social video plays without sound, and captions make every edit accessible to patients who are deaf or hard of hearing.",
      },
      {
        title: "Built with health-ad policies in mind",
        body: "No promised outcomes and careful use of before-and-after imagery, so campaigns don't stall in ad-platform review.",
      },
    ],
  },

  cost: {
    eyebrow: "What shapes the cost",
    title: "Quoted on scope, not a flat rate.",
    lead: "The shoot day drives most of the cost. These decide how long it runs and how much we deliver — all confirmed in a written quote before you commit.",
    items: [
      { title: "Providers & treatments", body: "How many people we interview and how many treatments we explain." },
      { title: "Locations", body: "One office or several, and whether we film at each." },
      { title: "Patient stories", body: "Consented testimonials need extra scheduling and release paperwork." },
      { title: "Number of edits", body: "How many finished videos, cut-downs and formats you need." },
      { title: "Photography scope", body: "Headshots only, or a full library of team and office images." },
      { title: "Campaign use", body: "Footage edited for paid campaigns we also manage, with versions to test." },
    ],
  },

  related: {
    title: "Works best with",
    allLabel: "All services",
    items: [
      { href: ROUTES.websiteDevelopment, body: "Where provider and treatment videos do the most work." },
      { href: ROUTES.reputationManagement, body: "Patient stories and reviews make the same point from two angles." },
      { href: ROUTES.healthcareSeo, body: "Real photos and video strengthen the pages and profiles that rank." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Video & photography questions.",
    items: [
      {
        q: "Do you film at our practice?",
        a: "Yes. We come to you with a small crew and portable lighting and sound, and plan the day around your patient schedule.",
      },
      {
        q: "What do we get from one shoot day?",
        a: (
          <>
            Typically a mix of provider interviews, treatment explainers, practice footage and photography, edited into
            finished videos and cut-downs for each platform. The exact list is agreed in the plan.{" "}
            <Ph>[CONFIRM STANDARD DELIVERABLES]</Ph>
          </>
        ),
      },
      {
        q: "How long does a shoot day take?",
        a: (
          <>
            It depends on how many providers and treatments we cover. You&apos;ll get a schedule in advance so you can
            block the right time. <Ph>[TYPICAL SHOOT LENGTH]</Ph>
          </>
        ),
      },
      {
        q: "Can you film patients? What about HIPAA?",
        a: "Only with their written consent. We never film patient information, charts or screens, and patient stories are scheduled with people who've agreed in advance. Your compliance lead can review our release forms.",
      },
      {
        q: "What if our doctors are nervous on camera?",
        a: "Most are, at first. Interviews are conversational, not scripted — we ask the questions patients ask and edit for the most natural answers.",
      },
      {
        q: "How soon do we see edits, and can we ask for changes?",
        a: (
          <>
            You review first cuts and send notes before anything is published. <Ph>[TURNAROUND &amp; REVISION ROUNDS]</Ph>
          </>
        ),
      },
      {
        q: "Do you deliver vertical video for Reels and Shorts?",
        a: "Yes. We plan shots so the same footage works widescreen on your website and vertical or square for social and ads.",
      },
      {
        q: "Are captions included?",
        a: "Yes, on every video — for sound-off viewing and for patients who are deaf or hard of hearing.",
      },
      {
        q: "Can the photos go on our website and Google Business Profile?",
        a: "Yes — that's what they're for. Images are delivered sized for your website, Business Profile, ads and email.",
      },
      {
        q: "Who owns the footage?",
        a: (
          <>
            Your practice owns the finished videos and photos. <Ph>[CONFIRM RAW FOOTAGE &amp; USAGE RIGHTS]</Ph>
          </>
        ),
      },
    ],
  },

  cta: {
    title: (
      <>
        Show patients who they&apos;ll meet — <span className="v-neon">before they book</span>.
      </>
    ),
    lead: "Tell us which treatments you want to grow, and we'll plan a shoot day around them — with a clear list of what you'll get.",
    primary: { label: "Plan a shoot day", href: ROUTES.contact },
    secondary: { label: "Explore website development", href: ROUTES.websiteDevelopment },
  },
};

export type Phase = "Before" | "During" | "After";

/** "Shoot day": six tabbed steps grouped into before / during / after. */
export const SHOOT_DAY: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  needLabel: string;
  tabsLabel: string;
  phases: Phase[];
  steps: { id: string; phase: Phase; label: string; title: string; body: string; needs: string[] }[];
} = {
  eyebrow: "Shoot day",
  title: (
    <>
      What actually happens on <span className="v-neon">shoot day</span>.
    </>
  ),
  lead: "It takes less of your day than most practices expect. Here's the plan step by step — and what we'll need from you at each stage.",
  needLabel: "What we need from you",
  tabsLabel: "Shoot day steps",
  phases: ["Before", "During", "After"],
  steps: [
    {
      id: "plan",
      phase: "Before",
      label: "Plan",
      title: "Plan the shoot",
      body: "We agree on goals, the treatments to feature, a shot list, interview questions and a schedule that works around patients.",
      needs: ["The treatments you want more of", "Who's comfortable on camera", "Any patients willing to share their story"],
    },
    {
      id: "setup",
      phase: "During",
      label: "Set up",
      title: "Arrive and set up",
      body: "The crew sets up in a quiet room and manages light, sound and privacy — charts, screens and patient information kept out of frame.",
      needs: ["One quiet room for interviews", "A tidy front desk and treatment rooms", "One contact for the day"],
    },
    {
      id: "interviews",
      phase: "During",
      label: "Interviews",
      title: "Provider interviews",
      body: "Relaxed, conversational interviews rather than scripts. We ask the questions patients ask, so answers come out natural. Consented patient stories can be filmed too.",
      needs: ["Time blocked for each provider", "Solid-colored clothing", "Signed releases for anyone filmed"],
    },
    {
      id: "broll",
      phase: "During",
      label: "B-roll",
      title: "Practice footage",
      body: "The entrance, waiting room, team at work, technology and treatment details (with consent) — the footage that makes every edit feel like your practice.",
      needs: ["Access to rooms between patients", "Staff happy to appear on camera"],
    },
    {
      id: "photos",
      phase: "During",
      label: "Photos",
      title: "Photography",
      body: "Provider headshots, team photos, the building, reception and treatment rooms — shot on the same visit.",
      needs: ["Everyone available in one window", "Branded scrubs or attire, if you use them"],
    },
    {
      id: "edit",
      phase: "After",
      label: "Edit & delivery",
      title: "Edit & delivery",
      body: "We cut versions for your website, testimonials, ads and vertical reels, with captions. You review first cuts and send notes before anything goes live.",
      needs: ["Notes on first cuts", "Final approval from your providers"],
    },
  ],
};

/** "What we film": six video types, each with where it gets used. */
export const VIDEO_TYPES: {
  eyebrow: string;
  title: string;
  lead: string;
  usedOnLabel: string;
  items: { title: string; body: string; uses: string[] }[];
} = {
  eyebrow: "What we film",
  title: "Six kinds of video every practice can use.",
  lead: "One shoot day can cover several of these. Each is edited for the places patients will actually see it.",
  usedOnLabel: "Used on",
  items: [
    {
      title: "Provider interviews",
      body: "Your doctors and dentists, in their own words, on how they practice and who they help.",
      uses: ["Homepage", "Provider pages", "Business Profile", "Retargeting ads"],
    },
    {
      title: "Treatment explainers",
      body: "Plain-language walkthroughs of a procedure: who it's for, what happens and what recovery looks like.",
      uses: ["Service pages", "Landing pages", "Follow-up emails"],
    },
    {
      title: "Patient stories",
      body: "Consented testimonials from patients who want to share their experience, filmed with care.",
      uses: ["Reviews page", "Social", "Meta ads"],
    },
    {
      title: "Office tour & meet the team",
      body: "The front desk, the rooms, the people — so a first visit feels familiar before it happens.",
      uses: ["About & contact pages", "New-patient emails"],
    },
    {
      title: "Ad & reel cut-downs",
      body: "Short vertical and square edits built for the first few seconds, with captions for sound-off viewing.",
      uses: ["Paid social", "Instagram Reels", "YouTube Shorts", "TikTok"],
    },
    {
      title: "Practice photography",
      body: "Headshots, team photos and real images of your office to replace stock photography everywhere.",
      uses: ["Website", "Business Profile", "Ads", "Email"],
    },
  ],
};

/** "Photography": copy beside a contact sheet of what we photograph. */
export const PHOTO: {
  eyebrow: string;
  title: ReactNode;
  body: string[];
  listTitle: string;
  list: string[];
  cta: { label: string; href: string };
} = {
  eyebrow: "Photography",
  title: (
    <>
      Real photos, <span className="v-neon">on the same visit</span>.
    </>
  ),
  body: [
    "Patients notice stock photos. Real images of your providers and office build trust the moment a page loads — and give your Business Profile the current, genuine photos it needs.",
    "Because photos are shot on the same visit as video, you get a full library without a second day out of the schedule — sized for your website, profiles, ads and email.",
  ],
  listTitle: "What we photograph",
  list: [
    "Provider headshots",
    "Team & front desk",
    "Building, sign & parking",
    "Reception & waiting area",
    "Treatment rooms & technology",
    "Candid team moments",
  ],
  cta: { label: "Plan a shoot day", href: ROUTES.contact },
};

/** Hero mock: a provider-interview edit with lower third, captions, a timeline and the formats it's cut to. Illustrative only. */
export const MOCK = {
  tag: "Edit preview",
  flag: "Illustrative — not client footage",
  timecode: "00:42 / 01:30",
  name: "Dr. Your Name, DDS",
  practice: "Your Practice · Implant dentistry",
  caption: "We'll walk you through every step before we start.",
  /** Timeline clips; `w` is the clip's share of the timeline in %. */
  clips: [
    { label: "Interview", w: 34 },
    { label: "B-roll", w: 18 },
    { label: "Interview", w: 28 },
    { label: "End card", w: 20 },
  ],
  formatsLabel: "Cut to",
  formats: [
    { ratio: "16:9", use: "Website" },
    { ratio: "9:16", use: "Reels & Shorts" },
    { ratio: "1:1", use: "Feed ads" },
  ],
};
