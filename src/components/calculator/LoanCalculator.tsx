"use client";

import Link from "next/link";
import { useState } from "react";

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(2000);
  const [term, setTerm] = useState<number>(24);
  const rate = 0.1;

  const monthlyRate = rate / 12;
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);
  const totalRepayment = monthlyPayment * term;

  return (
    <section id="calculator" className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="divider-gold" />
            <span className="text-accent-dark font-bold text-xs uppercase tracking-[0.3em]">
              Rates & Fees
            </span>
            <span className="divider-gold rotate-180" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-dark leading-[1.1]">
            Loan <span className="italic text-primary">calculator.</span>
          </h2>
          <p className="text-gray-600 mt-5 max-w-xl mx-auto text-lg">
            Estimate your monthly payments with our interactive calculator.
            Transparent rates, no surprises.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Decorative gold corner */}
            <div className="absolute -top-3 -right-3 w-24 h-36 border-t-2 border-r-2 border-accent rounded-tr-3xl" />
            <div className="absolute -bottom-3 -left-3 w-24 h-36 border-b-2 border-l-2 border-accent rounded-bl-3xl" />

            <div className="relative bg-surface rounded-3xl border border-gray-200 shadow-[0_30px_60px_-20px_rgba(11,31,28,0.2)] overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Controls */}
                <div className="p-8 lg:p-12">
                  <span className="inline-block font-display text-xs font-semibold text-accent-dark uppercase tracking-[0.2em] mb-6">
                    Customize your loan
                  </span>

                  <div className="mb-8">
                    <div className="flex justify-between items-baseline mb-4">
                      <label className="text-sm font-semibold text-dark">
                        Loan Amount
                      </label>
                      <span className="font-display text-3xl font-semibold text-primary">
                        ${amount.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2000}
                      max={10000}
                      step={500}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 uppercase tracking-wider">
                      <span>$2,000</span>
                      <span>$10,000</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="text-sm font-semibold text-dark block mb-4">
                      Loan Term
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[24, 36, 60].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTerm(t)}
                          className={`py-3.5 rounded-xl font-semibold text-sm transition-all border ${
                            term === t
                              ? "bg-dark text-accent border-dark shadow-[0_8px_24px_-8px_rgba(11,31,28,0.5)]"
                              : "bg-transparent text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {t} mo
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl border border-accent/30 bg-accent/5">
                    <svg
                      className="w-5 h-5 text-accent-dark shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-sm text-dark">
                      <span className="font-semibold">Fixed APR:</span>{" "}
                      {(rate * 100).toFixed(2)}%
                      <span className="text-gray-500"> · for entire term</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-cta-gradient p-8 lg:p-12 text-surface flex flex-col justify-center relative overflow-hidden">
                  {/* Decorative gold ring */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-accent/20" />

                  <span className="inline-block font-display text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-3">
                    Your estimate
                  </span>
                  <p className="text-surface/70 text-sm mb-1">
                    Monthly Payment
                  </p>
                  <p className="font-display text-6xl font-semibold mb-8 text-surface">
                    ${monthlyPayment.toFixed(2)}
                  </p>

                  <div className="space-y-3 pb-6 border-b border-dashed border-surface/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-surface/60">Loan Amount</span>
                      <span className="font-semibold">
                        ${amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface/60">Interest Rate</span>
                      <span className="font-semibold">
                        {(rate * 100).toFixed(2)}% APR
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-surface/60">Loan Term</span>
                      <span className="font-semibold">{term} months</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 mb-8">
                    <span className="text-surface/80 text-sm">
                      Total Repayment
                    </span>
                    <span className="font-display font-semibold text-lg text-accent">
                      ${totalRepayment.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="/apply"
                    className="group inline-flex items-center justify-center gap-2 bg-accent text-dark font-bold py-4 rounded-full hover:bg-secondary-light transition-all hover:shadow-[0_12px_32px_-8px_rgba(245,158,11,0.6)] text-center"
                  >
                    Apply for This Loan
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
