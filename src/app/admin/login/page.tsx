"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("adminUser")) {
      router.replace("/admin/applications");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError("API URL is not configured.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          data?.message ||
            (response.status === 401
              ? "Invalid email or password."
              : `Login failed (${response.status}).`),
        );
        return;
      }

      const user = data?.user ?? data?.data?.user ?? { email: trimmedEmail };
      const token = data?.token ?? data?.accessToken ?? data?.data?.token;

      localStorage.setItem("adminUser", JSON.stringify(user));
      if (token) localStorage.setItem("adminToken", token);

      router.replace("/admin/applications");
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="rounded-lg p-8 max-w-md w-full bg-white shadow-2xl">
        <h1 className="text-center font-bold text-2xl text-gray-900">
          Admin Login
        </h1>
        <p className="text-center text-sm text-gray-500 mt-1">
          Sign in to access the admin panel
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              className="border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="admin@example.com"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              className="border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md py-2 px-3"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-2.5 rounded-md font-medium hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
