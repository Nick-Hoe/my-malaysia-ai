import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viral Visual & Copy Generator | My Malaysia AI",
  description:
    "A premium one-click visual and copy generator for Malaysian sellers on Xiaohongshu and Shopee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
