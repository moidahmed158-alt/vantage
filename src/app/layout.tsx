import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Effects } from "@/components/site/Effects";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["300", "400", "500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Healthcare growth partner`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Healthcare growth partner`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#03050b",
  colorScheme: "dark",
};

// Runs before paint: lets CSS hide reveal targets only when JS is available,
// and un-hides them if the app never hydrates.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3500);`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="v-skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
