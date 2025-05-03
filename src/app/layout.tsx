import type { Metadata } from "next";
import "./globals.css";
import RootProvider from "@/components/provider";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Create your task and achieve your target",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
