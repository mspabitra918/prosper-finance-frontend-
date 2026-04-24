"use client";

import { LoanCalculator } from "@/src/components/calculator/LoanCalculator";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import Link from "next/link";

export default function RatesFeesPage() {
  const rateDetails = [
    {
      title: "Personal Loans",
      apr: "10%",
      amounts: "$2,000 – $10,000",
      terms: "24 – 60 months",
      origination: "0%",
    },
    {
      title: "Debt Consolidation",
      apr: "10%",
      amounts: "$5,000 – $10,000",
      terms: "24 – 60 months",
      origination: "0%",
    },
    {
      title: "Home Improvement",
      apr: "10%",
      amounts: "$5,000 – $10,000",
      terms: "24 – 60 months",
      origination: "0%",
    },
  ];

  const fees = [
    { label: "Application Fee", value: "$0", highlight: true },
    { label: "Prepayment Penalty", value: "$0", highlight: true },
    {
      label: "Late Payment Fee",
      value: "5% of past-due amount or $15, whichever is greater",
    },
    { label: "Returned Payment Fee", value: "$15" },
    {
      label: "Origination Fee",
      value: "0% (deducted from loan proceeds)",
    },
    { label: "Check Processing Fee", value: "$7 per check payment" },
  ];

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
                Transparent Pricing
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Rates & Fees
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Competitive fixed rates with no hidden fees. Know exactly what
              you&apos;ll pay before you commit.
            </p>
          </div>
        </section>

        {/* Rate Cards */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
                Our Loan Rates
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                All rates are fixed for the life of your loan. Your actual rate
                depends on credit profile, income, and other factors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {rateDetails.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-dark mb-6">
                    {item.title}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">APR Range</p>
                      <p className="text-2xl font-extrabold text-primary">
                        {item.apr}
                      </p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Loan Amount</span>
                      <span className="font-semibold text-dark">
                        {item.amounts}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Term Length</span>
                      <span className="font-semibold text-dark">
                        {item.terms}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Origination Fee</span>
                      <span className="font-semibold text-dark">
                        {item.origination}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/apply"
                    className="mt-6 block text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all"
                  >
                    Check Your Rate
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator */}
        <LoanCalculator />

        {/* Fee Schedule */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark">
                Fee Schedule
              </h2>
              <p className="text-gray-500 mt-3">
                We believe in complete transparency. Here&apos;s a full
                breakdown of all possible fees.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {fees.map((fee, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-5 ${
                    i < fees.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <span className="font-semibold text-dark">{fee.label}</span>
                  <span
                    className={`text-sm font-semibold ${
                      fee.highlight
                        ? "text-success bg-green-50 px-3 py-1 rounded-full"
                        : "text-gray-600"
                    }`}
                  >
                    {fee.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <strong className="text-dark">Important:</strong> The
                  origination fee is deducted from your loan proceeds before
                  disbursement. For example, if you take a $10,000 loan with a
                  0% origination fee, you&apos;ll receive $10,000. There are
                  never any prepayment penalties — pay off your loan early at
                  any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
