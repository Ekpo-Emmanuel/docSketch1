import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ 
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "DocSketch",
  description: "Documents & diagrams for students and teams",
};


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
