import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-10 h-10 text-[#0A66C2]" />
        </div>
        <h1 className="text-5xl font-bold text-black mb-2">404</h1>
        <p className="text-[#666] text-lg mb-6">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          Back to Jobs
        </Link>
      </div>
    </>
  );
}
