import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import { site } from "@/data/portfolio";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["600", "700", "800"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  keywords: ["Saksham Upreti", "Full-Stack Engineer", "AI Engineer", "RAG", "Next.js", "Portfolio"],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description: site.tagline },
};

export const viewport: Viewport = { themeColor: "#05060a" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}>
      <body className="grain antialiased">
        <SmoothScroll />
        <Cursor />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
