"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
        <svg
          className="w-5 h-5 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 3v18m0-18c-3.866 0-7 2.239-7 5s3.134 5 7 5 7 2.239 7 5-3.134 5-7 5"
          />
        </svg>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent ring-2 ring-surface" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold text-dark tracking-tight">
          Prosper
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-dark">
          Finance
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Rates & Fees", href: "/rates-fees" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,118,110,0.08)] py-2"
          : "bg-surface py-3 border-b border-gray-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Prosper Finance home">
            <Wordmark />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-gray-700 hover:text-primary px-4 py-2 transition-colors group"
              >
                {item.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/apply"
              className="group relative inline-flex items-center gap-2 bg-dark text-surface px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-primary hover:shadow-[0_8px_24px_-8px_rgba(15,118,110,0.6)]"
            >
              Apply Now
              <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-accent transition-colors" />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-dark hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-white rounded-2xl border border-gray-200 p-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-primary-50 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-dark hover:bg-primary text-surface px-4 py-3 rounded-xl font-semibold transition-colors mt-2"
              >
                Apply Now
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
