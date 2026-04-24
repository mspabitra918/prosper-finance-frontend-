import Link from "next/link";

function FooterWordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 3v18m0-18c-3.866 0-7 2.239-7 5s3.134 5 7 5 7 2.239 7 5-3.134 5-7 5"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold text-surface tracking-tight">
          Prosper
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          Finance
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark text-surface relative overflow-hidden">
      {/* Decorative gold accent bar */}
      <div className="h-1 bg-gold-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="mb-5">
              <FooterWordmark />
            </div>
            <p className="text-surface/60 text-sm leading-relaxed">
              Prosper Finance is a trusted direct lender providing personal
              loans with transparent terms and competitive rates. We are
              committed to helping you achieve your financial goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.2em] text-accent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Rates & Fees", href: "/rates-fees" },
                { label: "FAQ", href: "/faq" },
                { label: "Apply Now", href: "/apply" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-surface/70 hover:text-accent transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-accent group-hover:w-3 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.2em] text-accent">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                {
                  label: "Fair Lending Statement",
                  href: "/fair-lending-statement",
                },
                {
                  label: "Direct Lender Disclosure",
                  href: "/direct-lender-disclosure",
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-surface/70 hover:text-accent transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-accent group-hover:w-3 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold mb-5 uppercase tracking-[0.2em] text-accent">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-surface/70">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-accent mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>leads@lendingfinance.site</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-accent mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(773) 236-7585</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-accent mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Mon–Fri: 8 AM – 5 PM PST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-14 pt-8 border-t border-surface/10">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                label: "256-Bit SSL Secure",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                label: "$0 Upfront Fees",
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                label: "No Credit Impact",
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-surface/70 text-sm"
              >
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
                    d={badge.icon}
                  />
                </svg>
                {badge.label}
              </div>
            ))}
          </div>
          <p className="text-center text-surface/50 text-sm">
            &copy; {new Date().getFullYear()} Prosper Finance. All rights
            reserved. Prosper Finance is a registered Direct Lender.
          </p>
        </div>
      </div>
    </footer>
  );
}
