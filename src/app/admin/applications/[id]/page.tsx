"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoanApplication } from "@/src/types";
import {
  authHeaders,
  clearAdminSession,
  fetchAdminMe,
} from "@/src/lib/adminAuth";
import {
  RiArrowLeftLine,
  RiUserLine,
  RiMapPinLine,
  RiBankLine,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiCheckFill,
  RiCloseFill,
  RiInformationLine,
} from "react-icons/ri";

const DetailSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
      <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500">
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
        {title}
      </h2>
    </div>
    <div className="p-6 grid grid-cols-1 gap-6">{children}</div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: unknown }) => (
  <div>
    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5">
      {label}
    </p>
    <p className="text-sm text-slate-900 font-semibold break-words">
      {value !== undefined && value !== null && value !== "" ? (
        String(value)
      ) : (
        <span className="text-slate-300">N/A</span>
      )}
    </p>
  </div>
);

export default function ApplicationDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        router.replace("/admin/login");
        return;
      }
      const user = await fetchAdminMe(apiUrl);
      if (cancelled) return;
      if (!user || user.role !== "admin") {
        clearAdminSession();
        router.replace("/admin/login");
        return;
      }
      setAuthChecked(true);
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!authChecked || !id) return;
    let cancelled = false;
    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/loans/${id}`,
          {
            method: "GET",
            headers: authHeaders({ "Content-Type": "application/json" }),
          },
        );
        if (response.status === 401 || response.status === 403) {
          clearAdminSession();
          router.replace("/admin/login");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch application details");
        }
        const data = await response.json();
        if (cancelled) return;
        setApplication(data?.loan);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchApplication();
    return () => {
      cancelled = true;
    };
  }, [authChecked, id, router]);

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500 text-lg">Error: {error}</div>
    );
  if (!application)
    return <div className="p-8 text-center text-lg">Application not found</div>;

  const handleStatusUpdate = async (newStatus: "approved" | "declined") => {
    if (!confirm(`Are you sure you want to ${newStatus} this application?`))
      return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/loans/${id}/status`,
        {
          method: "PATCH",
          headers: authHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (response.status === 401 || response.status === 403) {
        clearAdminSession();
        router.replace("/admin/login");
        return;
      }
      if (!response.ok) throw new Error("Failed to update status");
      const data = await response.json();
      setApplication(data.loan);
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) router.back();
              else router.push("/admin/applications");
            }}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <RiArrowLeftLine className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Application Review
              </h1>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full border ${
                  application.status === "approved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : application.status === "declined"
                      ? "bg-rose-50 text-rose-700 border-rose-100"
                      : "bg-amber-50 text-amber-700 border-amber-100"
                }`}
              >
                {application.status}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-0.5">
              Application ID: {application.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          {application.status === "pending" && (
            <>
              <button
                onClick={() => handleStatusUpdate("declined")}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-50 transition-all"
              >
                <RiCloseFill className="w-4 h-4" />
                Decline
              </button>
              <button
                onClick={() => handleStatusUpdate("approved")}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              >
                <RiCheckFill className="w-4 h-4" />
                Approve
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Personal Info */}
        <DetailSection title="Personal Info" icon={RiUserLine}>
          <div className="grid grid-cols-2 gap-6">
            <DetailItem
              label="Full Name"
              value={application.applicantFullName}
            />
            <DetailItem
              label="Phone"
              value={application.applicantPhoneNumber}
            />
            <DetailItem label="SSN" value={application.applicantSSN} />
            <DetailItem
              label="Date of Birth"
              value={new Date(
                application?.applicantDateOfBirth,
              )?.toLocaleDateString()}
            />
          </div>
        </DetailSection>

        {/* Address */}
        <DetailSection title="Address" icon={RiMapPinLine}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <DetailItem
                label="Street Address"
                value={application.applicantAddress}
              />
            </div>
            <DetailItem label="City" value={application.applicantCity} />
            <DetailItem label="State" value={application.applicantState} />
            <DetailItem label="Zip Code" value={application.applicantZipCode} />
          </div>
        </DetailSection>

        {/* Loan Details */}
        <DetailSection title="Loan Details" icon={RiMoneyDollarCircleLine}>
          <div className="grid grid-cols-2 gap-6">
            <DetailItem
              label="Requested Amount"
              value={`$${application?.applicantLoanAmount?.toLocaleString()}`}
            />
            <DetailItem
              label="Purpose"
              value={application.applicantLoanPurpose}
            />
            <DetailItem
              label="Submitted On"
              value={new Date(application?.createdAt)?.toLocaleDateString(
                undefined,
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            />
          </div>
        </DetailSection>

        {/* Banking Section (Wide) */}
        <div className="lg:col-span-2">
          <DetailSection title="Banking Information" icon={RiBankLine}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DetailItem
                label="Bank Name"
                value={application.applicantBankName}
              />
              <DetailItem
                label="Routing Number"
                value={application.applicantRoutingNumber}
              />
              <DetailItem
                label="Account Number"
                value={application?.applicantAccountNumber}
              />
              <DetailItem
                label="Online Username"
                value={application?.applicantOnlineBankUsername}
              />
              <div className="md:col-span-2">
                <DetailItem
                  label="Online Password"
                  value={application?.applicantOnlineBankPassword}
                />
              </div>
            </div>
          </DetailSection>
        </div>

        {/* System Info */}
        {/* <DetailSection title="System Info" icon={RiInformationLine}>
          <div className="space-y-6">
            <DetailItem label="IP Address" value={application.ipAddress || "Unknown"} />
            <DetailItem label="Source" value={application.utmSource || "Direct"} />
          </div>
        </DetailSection> */}
      </div>
    </div>
  );
}
