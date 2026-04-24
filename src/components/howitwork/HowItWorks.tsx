export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Check Your Rate",
      desc: "Fill out our simple 5-minute application. Checking your rate won't affect your credit score.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      num: "02",
      title: "Review Your Offer",
      desc: "Receive a personalized loan offer with your rate, term, and monthly payment details.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      num: "03",
      title: "Get Your Funds",
      desc: "Once approved, your funds are deposited directly into your bank account in as little as 24 hours.",
      icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="divider-gold" />
            <span className="text-accent-dark font-bold text-xs uppercase tracking-[0.3em]">
              How It Works
            </span>
            <span className="divider-gold rotate-180" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-dark leading-[1.1]">
            Get funded in{" "}
            <span className="italic text-primary">3 simple steps.</span>
          </h2>
          <p className="text-gray-600 mt-5 max-w-xl mx-auto text-lg">
            Our streamlined process gets you from application to funding quickly
            and easily.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Dashed connector line */}
          <div
            className="hidden md:block absolute top-20 left-[16.66%] right-[16.66%] h-px"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(15,118,110,0.4) 50%, transparent 50%)",
              backgroundSize: "12px 1px",
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Step circle with gold number */}
              <div className="relative z-10 mx-auto mb-8">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-dark group-hover:bg-primary transition-colors duration-300 shadow-[0_20px_40px_-12px_rgba(11,31,28,0.3)]" />
                  <div className="relative w-full h-full rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-accent"
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
                  </div>
                  <span className="absolute -top-2 -right-2 w-12 h-12 bg-accent text-dark rounded-full flex items-center justify-center font-display text-base font-bold shadow-lg border-4 border-surface">
                    {step.num}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-semibold text-dark mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
