import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeeban Mohanty — AI Engineer | RAG | LLMs | Agentic AI",
  description:
    "Portfolio of Jeeban Mohanty — AI Engineer specializing in RAG systems, LLMs, and Agentic AI workflows. View projects, benchmark demos, and contact.",
  keywords: ["AI Engineer", "RAG", "LLMs", "Agentic AI", "Jeeban Mohanty", "Qdrant", "Gemini"],
  openGraph: {
    title: "Jeeban Mohanty — AI Engineer",
    description: "Production-grade RAG systems, LLMs, and Agentic AI workflows.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-on-surface antialiased`}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
