import type { Metadata, Viewport } from "next";
import { AnalysisProvider } from "@/context/analysis-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeautyBody AI Skin Expert — Premium Skin Analysis",
  description:
    "Discover your skin's true story with BeautyBody's AI-powered visual skin assessment. Personalized recommendations and seamless booking.",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BeautyBody AI",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-surface text-stone-50 antialiased selection:bg-champagne-500/30 selection:text-white">
        <AnalysisProvider>
          <Navbar />
          <main className="flex-1 pt-14 safe-area-top">{children}</main>
          <Footer />
        </AnalysisProvider>
      </body>
    </html>
  );
}
