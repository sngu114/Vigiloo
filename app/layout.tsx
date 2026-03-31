import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vigiloo",
  description: "Team 4's Project. Steven Nguyen, Nathan Soto, Sergio Nuno Zuniga, Andy Tran, Caleb Zeringue, and Marcus Hudson.",
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
        {/* Since we can't use usePathname here without breaking metadata, 
           we wrap the Navbar in a div that we can hide via CSS 
           inside the signup/page.tsx file.
        */}
        <div className="global-navbar-wrapper">
          <Navbar />
        </div>

        {children}
      </body>
    </html>
  );
}