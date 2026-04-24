import Link from "next/link";

export function LoanTypes() {
  const loans = [
    {
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      title: "Debt Consolidation",
      desc: "Simplify your finances by combining multiple debts into one manageable payment.",
    },
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      title: "Home Improvement",
      desc: "Transform your living space with funds for renovations and upgrades.",
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Medical Expenses",
      desc: "Cover unexpected medical bills without the stress of high-interest credit cards.",
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Business",
      desc: "Fund your business ventures and take your entrepreneurial goals to the next level.",
    },
    {
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      title: "Education",
      desc: "Invest in your future with funding for tuition, certifications, and training programs.",
    },
    {
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      title: "Major Purchase",
      desc: "Finance large purchases with predictable monthly payments and competitive rates.",
    },
  ];

  return (
    <section className="py-24 bg-surface-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="divider-gold" />
              <span className="text-accent-dark font-bold text-xs uppercase tracking-[0.3em]">
                Loan Options
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-dark leading-[1.1] max-w-2xl">
              Personal loans for{" "}
              <span className="italic text-primary">every need.</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-lg">
            Whatever your financial goal, we have a loan solution tailored for
            you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loans.map((loan, i) => (
            <Link
              key={i}
              href={`/apply?purpose=${loan.title.toLowerCase().replace(/ /g, "-")}`}
              className="group relative bg-surface rounded-2xl p-8 border border-gray-200 hover:border-dark hover:shadow-[0_20px_50px_-20px_rgba(11,31,28,0.3)] transition-all duration-300 overflow-hidden"
            >
              {/* Accent stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />

              {/* Number marker */}
              <span className="absolute top-6 right-6 font-display text-xs font-semibold text-gray-400 uppercase tracking-wider">
                0{i + 1}
              </span>

              <div className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-accent transition-all duration-300 flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-primary group-hover:text-dark transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={loan.icon}
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-dark mb-3">
                {loan.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {loan.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:text-dark transition-colors">
                Apply Now
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
