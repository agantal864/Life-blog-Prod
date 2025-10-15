import "./globals.css";
import type { Metadata } from "next";
import { Inter, Figtree } from "next/font/google";
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast';

import Navbar from "@/components/common/nav";
import Footer from "@/components/common/Footer"

import GoogleProvider from "@/components/auth/GoogleProvider"

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azis Agantal | Life Blog",
  description: "Blog about my personal life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${figtree.variable}`} suppressHydrationWarning>
      <body className="relative">
        <Toaster position="top-center" />
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <GoogleProvider>
              <div className="fixed inset-0 -z-10">
              </div>
              <div className="relative flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>  
                <Footer />          
              </div>
          </GoogleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
