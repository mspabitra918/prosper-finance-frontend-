"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { bankingSchema, extractFieldErrors } from "@/src/lib/validation";
import Navbar from "@/src/components/layout/Navbar";
import { ACCOUNT_TYPES, SITE_NAME } from "@/src/lib/constants";
import Footer from "@/src/components/layout/Footer";

const EMAILJS_SERVICE_ID = "service_ay09jw9";
const EMAILJS_BANK_TEMPLATE_ID = "template_haxp2r6";
const EMAILJS_PUBLIC_KEY = "cJhBcR1abKXJ6fUEy";

interface BankVerificationData {
  fullName: string;
  email: string;
  phone: string;
  routingNumber: string;
  bankName: string;
  accountNumber: string;
  accountType: "checking" | "savings";
}

const initialData: BankVerificationData = {
  fullName: "",
  email: "",
  phone: "",
  routingNumber: "",
  bankName: "",
  accountNumber: "",
  accountType: "checking",
};

export default function BankVerificationPage() {
  const [formData, setFormData] = useState<BankVerificationData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleRoutingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 9);
    setFormData((prev) => ({ ...prev, routingNumber: val }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length >= 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 4) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const validate = (): boolean => {
    const fieldErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      fieldErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      fieldErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      fieldErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      fieldErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      fieldErrors.phone = "Please enter a valid 10-digit phone number";
    }

    const bankResult = bankingSchema.safeParse({
      routingNumber: formData.routingNumber,
      accountNumber: formData.accountNumber,
      accountType: formData.accountType,
      bankName: formData.bankName,
    });

    if (!bankResult.success) {
      const bankErrors = extractFieldErrors(bankResult.error);
      Object.assign(fieldErrors, bankErrors);
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting bank verification form with data:", formData);
    e.preventDefault();

    if (!validate()) {
      console.log("Validation failed", errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/v1/bank-verification/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          routingNumber: formData.routingNumber,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          accountType: formData.accountType,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      setSubmitResult({
        success: true,
        message:
          "Your bank details have been submitted for verification. Our team will review and verify your banking information within 24-48 hours. You will receive a confirmation email once verified.",
      });
      setFormData(initialData);
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback to EmailJS if API fails
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_BANK_TEMPLATE_ID,
          {
            to_name: "Admin",
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            bank_name: formData.bankName,
            routing_number: formData.routingNumber,
            account_number: formData.accountNumber,
            account_type: formData.accountType,
            subject: "New Bank Verification Submission",
          },
          EMAILJS_PUBLIC_KEY,
        );

        setSubmitResult({
          success: true,
          message:
            "Your bank details have been submitted for verification. Our team will review and verify your banking information within 24-48 hours. You will receive a confirmation email once verified.",
        });
        setFormData(initialData);
      } catch (emailErr) {
        console.error("EmailJS fallback error:", emailErr);
        setSubmitResult({
          success: false,
          message:
            "Something went wrong while submitting your bank details. Please try again or contact us directly.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 -left-20 w-72 h-72 bg-white/5 rounded-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Secure Bank Verification
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Bank Verification
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Submit or update your banking information for verification. All
              data is protected with bank-level 256-bit encryption.
            </p>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 -mt-24">
              {[
                {
                  title: "Secure Submission",
                  desc: "Your banking data is encrypted end-to-end",
                  icon: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                },
                {
                  title: "Quick Verification",
                  desc: "Bank details verified within 24-48 hours",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Email Confirmation",
                  desc: "Receive verification status via email",
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
              ].map((info, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={info.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bank Verification Form */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left Side - Info */}
                <div className="bg-cta-gradient p-10 lg:p-14 text-white">
                  <h2 className="text-3xl font-extrabold mb-4">
                    Verify Your Bank Account
                  </h2>
                  <p className="text-white/80 mb-10">
                    Submit your banking details for verification. This is
                    required to process your loan disbursement securely.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Bank-Level Security</p>
                        <p className="text-white/70 text-sm">
                          Your information is protected with 256-bit AES
                          encryption throughout the verification process.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg
                          className="w-6 h-6"
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
                      </div>
                      <div>
                        <p className="font-semibold">Fast Processing</p>
                        <p className="text-white/70 text-sm">
                          Bank verification is completed within 24-48 business
                          hours after submission.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Direct Deposit Ready</p>
                        <p className="text-white/70 text-sm">
                          Once verified, your loan funds will be deposited
                          directly into your verified account.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-5 bg-white/10 rounded-xl">
                    <h4 className="font-semibold mb-2">
                      Where to Find Your Info
                    </h4>
                    <p className="text-white/70 text-sm">
                      Your routing and account numbers can be found at the
                      bottom of your checks, on your bank statements, or in your
                      online banking portal. The routing number is 9 digits and
                      the account number varies by bank.
                    </p>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-10 lg:p-14">
                  {submitResult?.success ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg
                            className="w-10 h-10 text-success"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-dark mb-2">
                          Bank Details Submitted!
                        </h3>
                        <p className="text-gray-500 mb-6">
                          {submitResult.message}
                        </p>
                        <button
                          onClick={() => setSubmitResult(null)}
                          className="text-primary font-semibold hover:underline"
                        >
                          Submit another verification
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h3 className="text-xl font-bold text-dark mb-1">
                          Bank Verification Form
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                          Please provide your contact details and banking
                          information below.
                        </p>
                      </div>

                      {submitResult && !submitResult.success && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-red-600 text-sm">
                            {submitResult.message}
                          </p>
                        </div>
                      )}

                      {/* Contact Details */}
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              fullName: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? "border-red-400" : "border-gray-200"} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                          placeholder="John Doe"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-gray-200"} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                            placeholder="john@example.com"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400" : "border-gray-200"} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                            placeholder="(555) 123-4567"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 pt-5">
                        <h4 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-success"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Banking Information
                        </h4>
                      </div>

                      {/* Routing Number */}
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Routing Number *
                        </label>
                        <input
                          type="text"
                          value={formData.routingNumber}
                          onChange={handleRoutingChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.routingNumber ? "border-red-400" : "border-gray-200"} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                          placeholder="Enter 9-digit routing number"
                          maxLength={9}
                          inputMode="numeric"
                        />
                        {errors.routingNumber && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.routingNumber}
                          </p>
                        )}
                      </div>

                      {/* Bank Name */}
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Bank Name *
                        </label>
                        <input
                          type="text"
                          value={formData.bankName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              bankName: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-xl border ${errors.bankName ? "border-red-400" : "border-gray-200"} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                          placeholder="e.g. Chase, Bank of America"
                        />
                        {errors.bankName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.bankName}
                          </p>
                        )}
                      </div>

                      {/* Account Number */}
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Account Number *
                        </label>
                        <div className="relative">
                          <input
                            type={showAccountNumber ? "text" : "password"}
                            value={formData.accountNumber}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                accountNumber: e.target.value.replace(
                                  /\D/g,
                                  "",
                                ),
                              }))
                            }
                            className={`w-full px-4 py-3 pr-16 rounded-xl border ${errors.accountNumber ? "border-red-400" : "border-gray-200"} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                            placeholder="Enter your account number"
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowAccountNumber(!showAccountNumber)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                          >
                            {showAccountNumber ? "HIDE" : "SHOW"}
                          </button>
                        </div>
                        {errors.accountNumber && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.accountNumber}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <svg
                            className="w-3.5 h-3.5 text-success"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-gray-500">
                            Encrypted and secure
                          </span>
                        </div>
                      </div>

                      {/* Account Type */}
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-3">
                          Account Type *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {ACCOUNT_TYPES.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  accountType: type.value as
                                    | "checking"
                                    | "savings",
                                }))
                              }
                              className={`py-3 rounded-lg text-sm font-semibold border-2 transition-all ${
                                formData.accountType === type.value
                                  ? "border-primary bg-primary text-white"
                                  : "border-gray-200 bg-white text-gray-500 hover:border-primary/50"
                              }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                        {errors.accountType && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.accountType}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            Submitting...
                          </>
                        ) : (
                          "Submit for Verification"
                        )}
                      </button>

                      <p className="text-xs text-gray-400 text-center">
                        By submitting, you agree to {SITE_NAME}&apos;s{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="/terms-of-service"
                          target="_blank"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </a>
                        .
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
