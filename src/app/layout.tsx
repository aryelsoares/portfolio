import './globals.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../lib/fontawesome";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: "Aryel Portfolio",
  description: "Personal",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen bg-bg text-text`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
