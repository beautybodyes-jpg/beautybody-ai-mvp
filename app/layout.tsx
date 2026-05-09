import type { Metadata, Viewport } from "next";
import { AnalysisProvider } from "@/context/analysis-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { OfflineBanner } from "@/components/pwa/offline-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeautyBody AI Skin Expert — Premium Skin Analysis",
  description:
    "Discover your skin's true story with BeautyBody's AI-powered visual skin assessment. Personalized recommendations and seamless booking.",
  icons: {
    icon: [
      { url: "/icons/icon-72x72.png", sizes: "72x72" },
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192" },
      { url: "/icons/icon-512x512.png", sizes: "512x512" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BeautyBody AI",
    startupImage: [
      {
        url: "/splash/apple-splash-2048-2732.jpg",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1668-2388.jpg",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1536-2048.jpg",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1170-2532.jpg",
        media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1125-2436.jpg",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-750-1334.jpg",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
  applicationName: "BeautyBody AI Skin Expert",
  formatDetection: {
    telephone: false,
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
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BeautyBody" />
        <meta name="msapplication-TileColor" content="#0c0a09" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#0c0a09" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-stone-50 antialiased selection:bg-champagne-500/30 selection:text-white">
        <AnalysisProvider>
          <OfflineBanner />
          <Navbar />
          <main className="flex-1 pt-14 safe-area-top">{children}</main>
          <Footer />
          <InstallPrompt />
        </AnalysisProvider>
      </body>
    </html>
  );
}
