import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageLoader } from "@/components/page-loader";
import { MusicConsent } from "@/components/music-consent";
import { Rajdhani, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const cyberwayRiders = localFont({
  src: "../public/CyberwayRiders-lg97d.ttf",
  variable: "--font-cyber-name",
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-cyber-ui",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl =
  process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";

const title = "Dev Starter by Zippystarter";
const description =
  "Dev Starter is an open source, one page developer portfolio template.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "./",
    siteName: title,
    images: "/og.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth shadcn">
      <body
        className={`font-body antialiased ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${cyberwayRiders.variable} ${rajdhani.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MusicConsent />
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
