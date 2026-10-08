import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pantera Corp. - Authentication Portal",
  description: "Secure Login and Account Activation portal for Pantera Corp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
