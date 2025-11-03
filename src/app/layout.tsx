import type { Metadata } from "next";
import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionAuthProvider } from "@/components/session-auth";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saas Template",
  description: "My own Saas template for future projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${redditSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <SessionAuthProvider>{children}</SessionAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
