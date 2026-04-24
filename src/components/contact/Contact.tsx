import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-surface rounded-3xl border border-gray-200 shadow-[0_30px_60px_-20px_rgba(11,31,28,0.15)] overflow-hidden">
          {/* Gold accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

          <div className="grid lg:grid-cols-2">
            <div className="bg-cta-gradient p-10 lg:p-14 text-surface relative overflow-hidden">
              {/* Decorative rings */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-accent/15" />
              <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="divider-gold" />
                  <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
                    Get In Touch
                  </span>
                </div>
                <h2 className="font-display text-4xl font-medium mb-4 leading-[1.1]">
                  We&apos;re here to{" "}
                  <span className="italic text-gold-shimmer">help.</span>
                </h2>
                <p className="text-surface/75 mb-12 text-lg">
                  Have questions? Our team is here to help you find the right
                  loan solution.
                </p>

                <div className="space-y-7">
                  {[
                    {
                      label: "Email",
                      value: "leads@lendingfinance.site",
                      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    },
                    {
                      label: "Phone",
                      value: "(773) 236-7585",
                      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    },
                    {
                      label: "Working Hours",
                      value: "Mon–Fri: 8 AM – 5 PM PST",
                      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all">
                        <svg
                          className="w-5 h-5 text-accent group-hover:text-dark transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-1">
                          {item.label}
                        </p>
                        <p className="text-surface font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-14 flex items-center bg-paper">
              <div className="w-full">
                <span className="inline-block font-display text-xs font-semibold text-accent-dark uppercase tracking-[0.2em] mb-5">
                  Ready when you are
                </span>
                <h3 className="font-display text-3xl font-medium text-dark mb-4 leading-tight">
                  Ready to get{" "}
                  <span className="italic text-primary">started?</span>
                </h3>
                <p className="text-gray-600 mb-8 text-base">
                  Apply now and get a decision in minutes. No obligation, no
                  credit impact.
                </p>

                <Link
                  href="/apply"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-dark hover:bg-primary text-surface font-bold px-10 py-4 rounded-full transition-all hover:shadow-[0_16px_40px_-8px_rgba(15,118,110,0.5)] hover:-translate-y-0.5 text-base"
                >
                  Apply Now
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-gray-500">
                  {["256-bit SSL encryption", "No upfront fees", "No credit impact"].map(
                    (label) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-primary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {label}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
