import ApplicationWizard from "@/src/components/forms/ApplicationWizard";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for a Personal Loan",
  description:
    "Apply for a personal loan from Prosper Finance in minutes. Competitive rates, fast approval, and direct funding. Check your rate with no credit impact.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-10 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Apply for a Personal Loan
            </h1>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Complete the form below to check your rate. It only takes a few
              minutes and won&apos;t affect your credit score.
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ApplicationWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
