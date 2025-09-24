import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solaranlage-Eignungs-Check",
  description: "Finden Sie heraus, ob sich eine Solaranlage für Ihr Dach lohnt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={geist.className}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
