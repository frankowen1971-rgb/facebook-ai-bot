"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Briefcase className="w-6 h-6" />
            <span>চাকরি খুঁজুন</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              সকল চাকরি
            </Link>
            <Link href="/?category=Engineering" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              ইঞ্জিনিয়ারিং
            </Link>
            <Link href="/?category=Design" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              ডিজাইন
            </Link>
            <Link href="/?type=Remote" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              রিমোট
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium" onClick={() => setOpen(false)}>
            সকল চাকরি
          </Link>
          <Link href="/?category=Engineering" className="block py-2 text-gray-600 hover:text-blue-600 font-medium" onClick={() => setOpen(false)}>
            ইঞ্জিনিয়ারিং
          </Link>
          <Link href="/?category=Design" className="block py-2 text-gray-600 hover:text-blue-600 font-medium" onClick={() => setOpen(false)}>
            ডিজাইন
          </Link>
          <Link href="/?type=Remote" className="block py-2 text-gray-600 hover:text-blue-600 font-medium" onClick={() => setOpen(false)}>
            রিমোট
          </Link>
        </div>
      )}
    </nav>
  );
}
