import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";

// Dynamically import the OfflineIndicator with SSR disabled to avoid hydration errors
const OfflineIndicator = dynamic(() => import("@/components/OfflineIndicator"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Brainstormer",
  description: "All-in-one markdown editor, collaborative canvas, and diagram-as-a-code builder",
  icons: {
    icon: "/assets/brainstormer_01.webp",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Brainstormer",
  },
  applicationName: "Brainstormer",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Brainstormer",
    title: "Brainstormer",
    description: "All-in-one markdown editor, collaborative canvas, and diagram-as-a-code builder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainstormer",
    description: "All-in-one markdown editor, collaborative canvas, and diagram-as-a-code builder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <meta name="application-name" content="Brainstormer" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Brainstormer" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#030712" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased font-serif bg-gray-950 text-white`}
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
          <Toaster />
          <OfflineIndicator />
        </body>
      </html>
    </AuthProvider>
  );
}
