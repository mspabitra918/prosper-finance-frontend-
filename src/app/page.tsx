"use client";

import { LoanCalculator } from "../components/calculator/LoanCalculator";
import { Contact } from "../components/contact/Contact";
import { CTABanner } from "../components/Cta";
import { FAQ } from "../components/faq/Faq";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/howitwork/HowItWorks";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { LoanTypes } from "../components/LoanTypes";
import { Stats } from "../components/Start";
import { WhyChooseUs } from "../components/whyus/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyChooseUs />
        <LoanCalculator />
        <LoanTypes />
        <HowItWorks />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
