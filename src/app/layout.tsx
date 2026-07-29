import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PAC IPNU IPPNU Tahunan - Portal Data Terpadu",
  description: "Portal Data Terpadu, Digital Office, Knowledge Center, dan Dashboard Monitoring PAC IPNU IPPNU Kecamatan Tahunan, Jepara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between antialiased bg-slate-50 text-slate-900 selection:bg-brand-purple selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
