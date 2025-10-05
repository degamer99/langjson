import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LangJson",
  description: "A Language Helper that uses Json",
  manifest: '/manifest.json', // Link to your manifest.json
  themeColor: '#0d9488', // Your theme color
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'My PWA App',
    // Add more properties for apple-touch-icon, etc. if needed
    // You can also add link tags directly in the root layout for apple-touch-icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        {/* Load Flutterwave’s checkout library */}
        <Script
          src="https://checkout.flutterwave.com/v3.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <link rel="apple-touch-icon" href="/icon512_maskable.png" />
        {children}
      </body>
    </html>
  );
}
