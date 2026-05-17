import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobBoard BD — Find Your Next Opportunity",
  description:
    "Discover top jobs at Grameenphone, bKash, Pathao, Google, Microsoft and more. Bangladesh's most trusted job aggregator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
