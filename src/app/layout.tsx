import './globals.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../lib/fontawesome";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: "Aryel Soares",
  description: "Personal portfolio showcasing skills and projects related to data science, process automation and artificial intelligence.",
  authors: [{ name: "Aryel Soares" }],
  keywords: ["Portfolio", "C++", "Python", "JavaScript", "TypeScript", "Data Science", "Machine Learning"],
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
