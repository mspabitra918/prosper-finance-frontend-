"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LoanApplication } from "@/src/types";
import {
  authHeaders,
  clearAdminSession,
  fetchAdminMe,
} from "@/src/lib/adminAuth";
import {
  RiSearchLine,
  RiCalendarLine,
  RiRefreshLine,
  RiEyeLine,
  RiFileDownloadLine,
} from "react-icons/ri";

const todayISO = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

function AdminApplicationsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date") || todayISO();
  const initialQuery = searchParams.get("q") || "";

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [queryInput, setQueryInput] = useState(initialQuery);

  const [authChecked, setAuthChecked] = useState(false);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [total, setTotal] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const syncUrl = useCallback((date: string, q: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (q) params.set("q", q);
    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", url);
  }, []);

  const [debouncedQuery, setDebouncedQuery] = useState(queryInput);
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(queryInput), 400);
    return () => clearTimeout(handle);
  }, [queryInput]);

  useEffect(() => {
    if (!authChecked) return;
    let cancelled = false;

    const run = async () => {
      setRefreshing(true);
      try {
        const qs = new URLSearchParams();
        if (selectedDate) {
          qs.set("date", selectedDate);
          qs.set("tzOffset", String(new Date().getTimezoneOffset()));
        }
        if (debouncedQuery) qs.set("q", debouncedQuery);

        const suffix = qs.toString() ? `?${qs.toString()}` : "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/loans/applications${suffix}`,
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
        if (!response.ok) throw new Error("Failed to fetch applications");
        const data = await response.json();
        if (cancelled) return;
        setApplications(data?.loans?.applications || []);
        setTotal(data?.loans?.total || 0);
        setError(null);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setRefreshing(false);
          setInitialLoading(false);
        }
      }
    };

    run();
    syncUrl(selectedDate, debouncedQuery);

    return () => {
      cancelled = true;
    };
  }, [authChecked, selectedDate, debouncedQuery, syncUrl, router]);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleClear = () => {
    setQueryInput("");
    setDebouncedQuery("");
    setSelectedDate(todayISO());
  };

  if (initialLoading)
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
          <p className="text-slate-500 font-medium text-lg">
            Loading applications...
          </p>
        </div>
      </div>
    );

  // const totalAmount = applications.reduce(
  //   (sum, app) => sum + Number(app.applicantLoanAmount || 0),
  //   0,
  // );

  return (
    <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Loan Applications
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Manage and review all incoming loan requests
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <RiRefreshLine
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button> */}
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            <RiFileDownloadLine className="w-4 h-4" />
            Export CSV
          </button> */}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Applications",
            value: total,
            color: "bg-blue-50 text-blue-700",
            border: "border-blue-100",
          },
          // {
          //   label: "Total Amount Requested",
          //   value: `$${totalAmount.toLocaleString()}`,
          //   color: "bg-emerald-50 text-emerald-700",
          //   border: "border-emerald-100",
          // },
          // {
          //   label: "Average Loan Size",
          //   value: `$${(applications.length ? Math.round(totalAmount / applications.length) : 0).toLocaleString()}`,
          //   color: "bg-amber-50 text-amber-700",
          //   border: "border-amber-100",
          // },
          // {
          //   label: "Pending Review",
          //   value: applications.filter((a) => a.status === "pending").length,
          //   color: "bg-purple-50 text-purple-700",
          //   border: "border-purple-100",
          // },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl bg-white border ${stat.border} shadow-sm`}
          >
            <p className="text-sm font-semibold text-slate-500 mb-2">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold ${stat.color.split(" ")[1]}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7 relative">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Search Applications
            </label>
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, or status..."
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Filter by Date
            </label>
            <div className="relative">
              <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="md:col-span-2 flex gap-2">
            {(selectedDate !== todayISO() || queryInput) && (
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 px-4 py-3 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-all bg-white shadow-sm"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loan Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                        {app.applicantFullName?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {app.applicantFullName}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {app.applicantPhoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">
                      ${app?.applicantLoanAmount?.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 font-medium capitalize">
                      {app.applicantLoanPurpose?.replace("-", " ")}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${
                        app.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : app.status === "declined"
                            ? "bg-rose-50 text-rose-700 border-rose-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                    {new Date(app.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      <RiEyeLine className="w-4 h-4" />
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-2">
                        <RiSearchLine className="w-8 h-8" />
                      </div>
                      <p className="text-slate-500 font-bold">
                        No applications found
                      </p>
                      <p className="text-slate-400 text-sm">
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminApplications() {
  return (
    <Suspense fallback={<div className="p-8">Loading applications...</div>}>
      <AdminApplicationsInner />
    </Suspense>
  );
}
