import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "চাকরি খুঁজুন | বাংলাদেশ জব পোর্টাল",
  description:
    "বাংলাদেশের সেরা জব অ্যাগ্রিগেটর। LinkedIn, Bdjobs, Indeed থেকে সকল চাকরি এক জায়গায়।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <footer className="bg-gray-800 text-gray-400 text-center py-8 mt-12">
          <p className="text-sm">
            &copy; 2026 চাকরি খুঁজুন — বাংলাদেশের জব অ্যাগ্রিগেটর
          </p>
          <p className="text-xs mt-1">
            LinkedIn · Bdjobs · Indeed · Glassdoor থেকে চাকরি সংগ্রহ করা হয়েছে
          </p>
        </footer>
      </body>
    </html>
  );
}
