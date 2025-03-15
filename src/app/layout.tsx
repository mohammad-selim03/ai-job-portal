import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // Import Roboto
import "./globals.css";
// import AuthProvider from "@/components/SessionProviders/SessionProviders";
import MainLayout from "@/layouts/MainLayout";
import CopyLayout from "./copyLayout";

// Initialize Roboto font
const roboto = Roboto({
  variable: "--font-roboto", 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"], 
});

export const metadata: Metadata = {
  title: "Hire Me",
  description: "An AI-powered job board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <MainLayout>
          <CopyLayout>{children}</CopyLayout>
        </MainLayout>
      </body>
    </html>
  );
}
