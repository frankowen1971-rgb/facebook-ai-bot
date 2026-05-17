import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Briefcase className="w-20 h-20 text-gray-300 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">৪০৪</h1>
      <p className="text-gray-500 mb-6 text-lg">পেজটি খুঁজে পাওয়া যায়নি</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
