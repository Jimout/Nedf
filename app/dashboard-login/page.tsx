"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const DEFAULT_USER = "nedfteam";
  const DEFAULT_PASS = "nedf123";

  useEffect(() => {
    if (localStorage.getItem("dashboardAuth")) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPass = localStorage.getItem("dashboardPassword") || DEFAULT_PASS;

    if (username === DEFAULT_USER && password === savedPass) {
      localStorage.setItem("dashboardAuth", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    const newPassword = prompt("Enter a new password:");
    if (newPassword) {
      localStorage.setItem("dashboardPassword", newPassword);
      alert("Password changed! Use the new one to log in.");
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-white">
      {/* Left Content (Login Form) */}
      <div className="flex-1 flex flex-col justify-center px-12 md:px-24 lg:px-32 z-10">
        {/* Logo */}
        <img src="/logo.png" alt="NEDF Logo" className="h-16 object-contain mb-10" />

        {/* Heading */}
        <h1 className="text-5xl font-bold text-[#001F4B] mb-3">Welcome to NEDF</h1>
        <p className="text-lg text-gray-500 mb-10">Please log in to continue</p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6 max-w-lg w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#001F4B]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#001F4B]"
          />
          <button
            type="submit"
            className="w-full py-4 bg-[#001F4B] text-white text-lg font-medium rounded-lg hover:bg-[#002966] transition"
          >
            Login
          </button>
        </form>

        {/* Forgot password */}
        <button
          onClick={handleForgotPassword}
          className="mt-6 text-[#001F4B] text-sm hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Right Decorative Image with Wave */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/room1.jpg')" }}
        >
          <div className="w-full h-full bg-[#001F4B]/40" />
        </div>

        {/* Wave Shape */}
        <svg
          className="absolute left-0 top-0 h-full w-64 text-white"
          preserveAspectRatio="none"
          viewBox="0 0 100 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 0 C20 300, 20 700, 100 1000 L0 1000 L0 0 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
