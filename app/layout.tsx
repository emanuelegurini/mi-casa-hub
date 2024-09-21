import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="m-auto w-full max-w-[1200px] flex-1 p-4">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
