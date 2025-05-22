import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s • MCU Internal",
    default: "MCU Internal",
  },
  description:
    "MCU internal system designed to help MCU teams manage and track customers who have been served. Provides an intuitive interface to view customer history, current status, and generate reports over time. The system supports role-based access control to ensure data security and limit access to authorized personnel only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="font-sans">{children}</main>
      </body>
    </html>
  );
}
