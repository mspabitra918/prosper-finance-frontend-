import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-hero-gradient min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(253, 252, 247, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(253, 252, 247, 0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Decorative gold rings */}
      <div className="absolute top-1/4 -right-32 w-md h-112 rounded-full border border-accent/20" />
      <div className="absolute top-1/3 -right-16 w-80 h-80 rounded-full border border-accent/15" />
      <div className="absolute bottom-10 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Editorial copy */}
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="divider-gold" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
                Direct Lender · Est. 2014
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium text-surface leading-[1.02] mb-8">
              Personal loans,
              <br />
              <span className="italic text-gold-shimmer">made to prosper.</span>
            </h1>

            <p className="text-lg text-surface/75 max-w-xl mb-10 leading-relaxed">
              Get funded in as little as 24 hours with competitive rates,
              transparent terms, and no hidden fees. Loans from{" "}
              <span className="text-surface font-semibold">
                $2,000 to $10,000
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/apply"
                className="group inline-flex items-center justify-center gap-3 bg-accent text-dark font-bold px-8 py-4 rounded-full hover:bg-secondary-light transition-all hover:shadow-[0_12px_32px_-8px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 text-base"
              >
                Check Your Rate
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
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center glass text-surface font-semibold px-8 py-4 rounded-full hover:bg-surface/10 transition-all text-base"
              >
                How It Works
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-surface/70 text-sm">
              {["No hidden fees", "No credit impact", "Fast funding"].map(
                (label) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {label}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right: Rate quote card */}
          <div className="lg:col-span-5 hidden lg:block animate-slide-in-right">
            <div className="relative">
              {/* Gold accent behind card */}
              <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl bg-accent/30 blur-xl" />
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-accent/40" />

              <div className="relative bg-surface rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Header strip */}
                <div className="bg-dark text-surface px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                      Featured Rate
                    </span>
                  </div>
                  <span className="text-xs text-surface/50">
                    No. 01 &nbsp;/&nbsp; 2026
                  </span>
                </div>

                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                    Sample Loan Estimate
                  </p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display text-5xl font-semibold text-dark">
                      $10,000
                    </span>
                    <span className="text-sm text-gray-500">borrowed</span>
                  </div>

                  <div className="space-y-3 pb-6 border-b border-dashed border-gray-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Interest Rate</span>
                      <span className="font-semibold text-dark">10% APR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Term</span>
                      <span className="font-semibold text-dark">36 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly Payment</span>
                      <span className="font-display text-xl font-semibold text-primary">
                        $322.67
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 bg-primary-50 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pre-qualified</p>
                      <p className="text-sm font-bold text-primary-dark">
                        No impact to your credit score
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating funded badge */}
              <div className="absolute -bottom-5 -left-5 bg-accent text-dark rounded-2xl px-5 py-3 shadow-xl animate-float flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                    Funded in
                  </p>
                  <p className="font-display text-base font-bold">24 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
