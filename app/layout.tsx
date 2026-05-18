import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawPick — Swipe to Adopt",
  description: "Browse adorable fictional pets and vote on whether you'd adopt them. See community results ranked by Most Loved, Most Voted, and Most Divisive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Quicksand:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
