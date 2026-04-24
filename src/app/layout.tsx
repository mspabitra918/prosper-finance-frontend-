import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prosper Finance - Personal Loans Made Simple",
  description:
    "Get personal loans from $2,000 to $50,000 with competitive rates. Fast approval, transparent terms, and funding in as little as 24 hours.",
  keywords:
    "personal loans, prosper finance, quick loans, low interest loans, debt consolidation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/logo.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
