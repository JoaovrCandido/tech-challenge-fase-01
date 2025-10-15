import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Home - Projeto Financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
