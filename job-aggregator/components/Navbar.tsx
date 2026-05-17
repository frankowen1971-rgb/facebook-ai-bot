"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Briefcase, Bell, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="bg-white border-b border-[#E0E0E0] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-14 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
              <Briefcase className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[#0A66C2] text-lg tracking-tight hidden sm:block">
              JobBoard<span className="text-black">BD</span>
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-sm hidden sm:flex items-center bg-[#F3F2EF] border border-[#E0E0E0] rounded-full px-3 py-1.5 gap-2 hover:border-[#0A66C2] transition-colors focus-within:border-[#0A66C2] focus-within:ring-1 focus-within:ring-[#0A66C2]">
            <Search className="w-4 h-4 text-[#666666] flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, companies..."
              className="bg-transparent text-sm outline-none w-full text-black placeholder-[#666666]"
            />
          </div>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {[
              { label: "Jobs", href: "/" },
              { label: "Companies", href: "#" },
              { label: "Salaries", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center px-3 py-1 text-[#666666] hover:text-black text-xs font-medium transition-colors group"
              >
                <span>{item.label}</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-[#666666] hover:bg-[#F3F2EF] hover:text-black transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
              Sign In
            </button>
            <button className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white bg-[#0A66C2] px-3 py-1.5 rounded-full hover:bg-[#004182] transition-colors">
              Post a Job
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full text-[#666666] hover:bg-[#F3F2EF]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E0E0E0] bg-white px-4 py-3 space-y-2">
          <div className="flex items-center bg-[#F3F2EF] border border-[#E0E0E0] rounded-full px-3 py-2 gap-2 mb-3">
            <Search className="w-4 h-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="bg-transparent text-sm outline-none w-full placeholder-[#666666]"
            />
          </div>
          {["Jobs", "Companies", "Salaries"].map((item) => (
            <Link
              key={item}
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-[#666666] hover:text-black"
            >
              {item}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] py-2 rounded-full">
              Sign In
            </button>
            <button className="flex-1 text-sm font-semibold text-white bg-[#0A66C2] py-2 rounded-full">
              Post a Job
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
