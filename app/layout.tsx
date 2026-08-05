import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Archivo is the site's single face (wayfinder #13) — no serif, no mono.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

// Name-led titles (wayfinder #16): the site exists to own the name searches.
export const metadata: Metadata = {
  metadataBase: new URL("https://hyhy.gg"),
  title: {
    default: "Harry Hartley — Lead Engineer",
    template: "%s — Harry Hartley",
  },
  description:
    "Lead engineer, Bath/Bristol. I build and run production systems end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-archivo)] text-[#161616] selection:bg-[#161616] selection:text-white">
        {children}
      </body>
    </html>
  );
}
