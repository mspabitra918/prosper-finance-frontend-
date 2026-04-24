"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        },
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      setSubmitResult({
        success: true,
        message:
          "Your message has been sent successfully! We will get back to you within 24 hours.",
      });
    } catch {
      setSubmitResult({
        success: false,
        message:
          "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }
  };

  const contactInfo = [
    {
      title: "Email",
      value: "leads@lendingfinance.site",
      desc: "We respond within 24 hours",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      title: "Phone",
      value: "(773) 236-7585",
      desc: "Mon–Fri: 8 AM – 5 PM PST",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      title: "Office",
      value: "3455 S Ashland Ave, Chicago, IL 60608",
      desc: "Chicago-Based Support",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

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
                We&apos;re Here to Help
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Have questions about our loans? Our team is ready to help you find
              the right solution for your financial needs.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="grid md:grid-cols-3 gap-8">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-gray-100"
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
                  <p className="text-primary font-semibold mb-1">
                    {info.value}
                  </p>
                  <p className="text-gray-500 text-sm">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left Side - Info */}
                <div className="bg-cta-gradient p-10 lg:p-14 text-white">
                  <h2 className="text-3xl font-extrabold mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-white/80 mb-10">
                    Fill out the form and our team will get back to you within
                    24 hours.
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Quick Response</p>
                        <p className="text-white/70 text-sm">
                          We aim to respond to all inquiries within 24 hours.
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Secure & Private</p>
                        <p className="text-white/70 text-sm">
                          Your information is protected with 256-bit encryption.
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
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Expert Team</p>
                        <p className="text-white/70 text-sm">
                          Our lending specialists are ready to assist you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-10 lg:p-14">
                  {submitResult ? (
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
                          Message Sent!
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Thank you for reaching out. We&apos;ll get back to you
                          within 24 hours.
                        </p>
                        <button
                          onClick={() => {
                            setSubmitResult(null);
                            setSubmitted(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              subject: "",
                              message: "",
                            });
                          }}
                          className="text-primary font-semibold hover:underline"
                        >
                          Send another message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-dark mb-2">
                            Subject
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          >
                            <option value="">Select a topic</option>
                            <option value="general">General Inquiry</option>
                            <option value="loan">Loan Application</option>
                            <option value="rates">Rates & Fees</option>
                            <option value="payment">Payment Question</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitted}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitted ? "Sending..." : "Send Message"}
                      </button>
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
