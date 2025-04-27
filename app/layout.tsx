import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brainstormer",
  description: "A SAAS application which will help in brainstorming ideas, providing a rich text editor and a canvas for brainstorming on different ideas.",
  icons: {
    icon: "/assets/brainstormer_01.webp",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased font-serif bg-gray-950 text-white`}
        >
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
