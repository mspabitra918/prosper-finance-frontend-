export function Stats() {
  const stats = [
    {
      value: "$10K",
      label: "Max Loan Amount",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      value: "10%",
      label: "Rates as Low As",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    {
      value: "24hrs",
      label: "Fast Funding",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      value: "60mo",
      label: "Flexible Terms",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
  ];

  return (
    <section className="relative -mt-14 z-10 max-w-6xl mx-auto px-4">
      <div className="bg-surface border border-gray-200 rounded-2xl shadow-[0_20px_50px_-20px_rgba(11,31,28,0.25)] grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative p-6 lg:p-8 group transition-colors hover:bg-primary-50 border-gray-200 nth-[n+3]:border-t even:border-l lg:nth-[n+3]:border-t-0 lg:not-first:border-l"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-display text-xs font-semibold text-accent-dark">
                0{i + 1}
              </span>
              <div className="w-10 h-10 bg-dark group-hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={stat.icon}
                  />
                </svg>
              </div>
            </div>
            <p className="font-display text-3xl lg:text-4xl font-semibold text-dark">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
