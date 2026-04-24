import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-20 bg-cta-gradient relative overflow-hidden">
      {/* Decorative gold rings */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full border border-accent/20" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full border border-accent/15" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="inline-flex items-center gap-3 mb-6">
          <span className="divider-gold" />
          <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
            Start Your Journey
          </span>
          <span className="divider-gold rotate-180" />
        </span>

        <h2 className="font-display text-4xl sm:text-5xl font-medium text-surface mb-5 leading-[1.1]">
          Take control of your finances{" "}
          <span className="italic text-gold-shimmer">today.</span>
        </h2>
        <p className="text-surface/75 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied borrowers who chose Prosper Finance for
          their personal loan needs. Apply now with no impact on your credit
          score.
        </p>
        <Link
          href="/apply"
          className="group inline-flex items-center gap-3 bg-accent text-dark font-bold px-10 py-4 rounded-full hover:bg-secondary-light transition-all hover:shadow-[0_16px_40px_-8px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 text-base"
        >
          Get Started Now
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
        <p className="text-surface/60 text-sm mt-6">
          No hidden fees &bull; Rates from 10% APR &bull; Funding in 24 hours
        </p>
      </div>
    </section>
  );
}
