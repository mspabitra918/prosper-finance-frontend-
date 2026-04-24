"use client";

import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Check Your Rate",
      desc: "Fill out our simple 5-minute application. Checking your rate won't affect your credit score. We use a soft credit pull to provide you with personalized options.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      details: [
        "Takes only 5 minutes to complete",
        "No impact to your credit score",
        "Secure 256-bit SSL encryption",
        "Instant pre-qualification decision",
      ],
    },
    {
      num: "02",
      title: "Review Your Offer",
      desc: "Receive a personalized loan offer with your rate, term, and monthly payment details. Compare options and choose what works best for your budget.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      details: [
        "Multiple term options available",
        "Fixed rates — no surprises",
        "Clear breakdown of all costs",
        "No obligation to accept",
      ],
    },
    {
      num: "03",
      title: "Get Your Funds",
      desc: "Once approved, your funds are deposited directly into your bank account in as little as 24 hours. Start using your loan for what matters most.",
      icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
      details: [
        "Direct deposit to your bank account",
        "Funding in as little as 24 hours",
        "No prepayment penalties",
        "Flexible repayment options",
      ],
    },
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
                Simple 3-Step Process
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              How It Works
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our streamlined process gets you from application to funding
              quickly and easily — with no hidden fees or surprises along the
              way.
            </p>
          </div>
        </section>

        {/* Steps Detail */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg">
                        {step.num}
                      </span>
                      <h2 className="text-3xl font-extrabold text-dark">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-gray-500 text-lg leading-relaxed mb-6">
                      {step.desc}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-success shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative w-64 h-64 mx-auto bg-primary-50 rounded-full flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={step.icon}
                        />
                      </svg>
                      <span className="absolute -top-2 -right-2 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                        {step.num}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-cta-gradient">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Apply now and get a decision in minutes. No obligation, no credit
              impact.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center bg-white text-primary-dark font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-0.5 text-lg"
            >
              Apply Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
