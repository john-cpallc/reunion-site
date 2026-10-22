import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Go Big Red 2027 · HHS Class of 2017",
    template: "%s · Go Big Red 2027",
  },
  description:
    "Huntsville High School Class of 2017 reunion hub — join the mailing list, meet the committee, and get FAQs for our 10-year reunion.",
  metadataBase: new URL("https://gobigred2027.com"),
  openGraph: {
    title: "Go Big Red 2027 · HHS Class of 2017",
    description:
      "Save the year. Join the Class of 2017 mailing list for reunion updates.",
    siteName: "Go Big Red 2027",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
