"use client";

import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "What are the eligibility requirements?",
      a: "You must be at least 18 years old, a U.S. citizen or permanent resident, have a valid bank account, and meet our minimum income requirements. We consider a range of credit profiles.",
    },
    {
      q: "Will checking my rate affect my credit score?",
      a: "No. Checking your rate involves a soft credit pull, which does not affect your credit score. A hard inquiry only occurs if you accept a loan offer and proceed with the application.",
    },
    {
      q: "How quickly can I receive my funds?",
      a: "Once your loan is approved and you accept the terms, funds can be deposited directly into your bank account in as little as 24 hours (1 business day).",
    },
    {
      q: "What can I use the loan for?",
      a: "Our personal loans can be used for a variety of purposes including debt consolidation, home improvement, medical expenses, major purchases, education, and more.",
    },
    {
      q: "Are there any prepayment penalties?",
      a: "No. You can pay off your loan early at any time without any prepayment penalties or additional fees.",
    },
    {
      q: "What interest rates do you offer?",
      a: "Our rates start as low as 10% APR depending on your credit profile, income, and other factors. All rates are fixed for the life of the loan.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left column — heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <span className="divider-gold" />
                <span className="text-accent-dark font-bold text-xs uppercase tracking-[0.3em]">
                  FAQ
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-medium text-dark leading-[1.1] mb-5">
                Frequently asked{" "}
                <span className="italic text-primary">questions.</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Find answers to common questions about our loans.
              </p>
              <p className="text-sm text-gray-500">
                Can&apos;t find what you need?{" "}
                <a
                  href="#contact"
                  className="text-primary font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:text-dark transition-colors"
                >
                  Contact us
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right column — questions */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`bg-surface rounded-2xl border transition-all ${
                    isOpen
                      ? "border-dark shadow-[0_10px_40px_-15px_rgba(11,31,28,0.25)]"
                      : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 p-6 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`font-display text-sm font-semibold mt-0.5 ${
                          isOpen ? "text-accent" : "text-accent-dark"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-lg font-semibold pr-4 ${
                          isOpen ? "text-dark" : "text-dark group-hover:text-primary"
                        } transition-colors`}
                      >
                        {faq.q}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isOpen
                          ? "bg-accent text-dark rotate-45"
                          : "bg-primary-50 text-primary group-hover:bg-dark group-hover:text-accent"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-16 text-gray-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
