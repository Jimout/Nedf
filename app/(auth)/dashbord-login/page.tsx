"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const DEFAULT_USER = "nedfteam";
  const DEFAULT_PASS = "nedf123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPass = localStorage.getItem("dashboardPassword") || DEFAULT_PASS;

    if (username === DEFAULT_USER && password === savedPass) {
      localStorage.setItem("dashboardAuth", "true"); // mark as logged in
      router.push("/dashboard/overview");           // redirect to dashboard
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
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">NEDF Dashboard Login</h1>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleForgotPassword}
        className="text-blue-600 mt-4 text-sm underline block mx-auto"
      >
        Forgot Password?
      </button>
    </div>
  );
}
