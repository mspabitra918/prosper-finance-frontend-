"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  const categories = [
    {
      title: "Getting Started",
      faqs: [
        {
          q: "What are the eligibility requirements?",
          a: "You must be at least 18 years old, a U.S. citizen or permanent resident, have a valid bank account, and meet our minimum income requirements. We consider a range of credit profiles.",
        },
        {
          q: "How do I apply for a loan?",
          a: "You can apply online in just 5 minutes. Click 'Apply Now' to get started. You'll need to provide basic personal information, income details, and the purpose of your loan.",
        },
        {
          q: "Will checking my rate affect my credit score?",
          a: "No. Checking your rate involves a soft credit pull, which does not affect your credit score. A hard inquiry only occurs if you accept a loan offer and proceed with the application.",
        },
      ],
    },
    {
      title: "Loan Details",
      faqs: [
        {
          q: "What loan amounts are available?",
          a: "We offer personal loans ranging from $2,000 to $10,000. The amount you qualify for depends on your credit profile, income, and other financial factors.",
        },
        {
          q: "What interest rates do you offer?",
          a: "Our rates start as low as 10% APR depending on your credit profile, income, and other factors. All rates are fixed for the life of the loan — your monthly payment will never change.",
        },
        {
          q: "What can I use the loan for?",
          a: "Our personal loans can be used for a variety of purposes including debt consolidation, home improvement, medical expenses, major purchases, education, and more.",
        },
        {
          q: "What loan terms are available?",
          a: "We offer loan terms of 24, 36, and 60 months. Shorter terms mean higher monthly payments but less interest paid overall. Longer terms provide lower monthly payments.",
        },
      ],
    },
    {
      title: "Funding & Payments",
      faqs: [
        {
          q: "How quickly can I receive my funds?",
          a: "Once your loan is approved and you accept the terms, funds can be deposited directly into your bank account in as little as 24 hours (1 business day).",
        },
        {
          q: "Are there any prepayment penalties?",
          a: "No. You can pay off your loan early at any time without any prepayment penalties or additional fees. We encourage early repayment if it works for your budget.",
        },
        {
          q: "How do I make payments?",
          a: "Payments can be made via automatic bank transfer (ACH), manual bank transfer, or by check. We recommend setting up autopay to ensure on-time payments and potentially qualify for a rate discount.",
        },
        {
          q: "What happens if I miss a payment?",
          a: "If you miss a payment, a late fee may apply (5% of past-due amount or $15, whichever is greater). We encourage you to contact us if you're having difficulty making payments — we may be able to help.",
        },
      ],
    },
    {
      title: "Security & Privacy",
      faqs: [
        {
          q: "Is my information secure?",
          a: "Absolutely. We use 256-bit SSL encryption to protect your data. We never share your personal information with unauthorized third parties.",
        },
        {
          q: "Are there any upfront fees?",
          a: "No. There are no application fees or upfront costs. The only fee is an origination fee (0%) which is deducted from your loan proceeds, not paid upfront.",
        },
      ],
    },
  ];

  // Flatten for indexing
  const allFaqs = categories.flatMap((cat) => cat.faqs);
  let globalIndex = 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 -left-20 w-72 h-72 bg-white/5 rounded-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Got Questions?
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Find answers to common questions about our loans, rates, and
              application process.
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {categories.map((category) => {
              const categoryStartIndex = globalIndex;
              const categoryItems = category.faqs.map((faq, j) => {
                const currentIndex = categoryStartIndex + j;
                return (
                  <div
                    key={currentIndex}
                    className="bg-white rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() =>
                        setOpen(open === currentIndex ? null : currentIndex)
                      }
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-dark pr-4">
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                          open === currentIndex ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        open === currentIndex ? "max-h-48 pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="px-6 text-gray-500 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              });
              globalIndex += category.faqs.length;

              return (
                <div key={category.title} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-dark mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-4">{categoryItems}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Still have questions CTA */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-dark mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Our team is here to help. Reach out and we&apos;ll get back to you
              within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center bg-white text-primary-dark font-bold px-8 py-4 rounded-xl border-2 border-primary hover:bg-primary-50 transition-all"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
