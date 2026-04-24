export function WhyChooseUs() {
  const features = [
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Transparent Rates",
      desc: "What you see is what you get. No hidden fees, no surprises. Our rates are fixed and clearly disclosed upfront.",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Lightning Fast Funding",
      desc: "Get your funds deposited directly into your bank account in as little as 24 hours after approval.",
    },
    {
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "Bank-Level Security",
      desc: "Your personal information is protected with 256-bit SSL encryption and industry-leading security protocols.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Dedicated Support",
      desc: "Our experienced loan advisors are available to guide you through every step of the process.",
    },
    {
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      title: "Simple Application",
      desc: "Our streamlined application takes just minutes to complete. No lengthy paperwork or complicated processes.",
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Flexible Options",
      desc: "Choose loan amounts from $2,000 to $10,000 with terms from 24 to 60 months to fit your needs.",
    },
  ];

  return (
    <section className="py-24 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="divider-gold" />
            <span className="text-accent-dark font-bold text-xs uppercase tracking-[0.3em]">
              Why Choose Us
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-dark leading-[1.1]">
            The Prosper Finance{" "}
            <span className="italic text-primary">advantage.</span>
          </h2>
          <p className="text-gray-600 mt-5 text-lg max-w-xl">
            We make borrowing simple, transparent, and fast so you can focus on
            what matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-3xl overflow-hidden">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-surface p-8 hover:bg-white transition-all duration-300 relative"
            >
              {/* Number */}
              <span className="absolute top-8 right-8 font-display text-sm font-semibold text-accent-dark opacity-40">
                0{i + 1}
              </span>

              <div className="w-12 h-12 bg-primary-50 group-hover:bg-dark rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-primary group-hover:text-accent transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={f.icon}
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-dark mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>

              {/* Bottom accent line on hover */}
              <div className="absolute left-8 right-8 bottom-6 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
