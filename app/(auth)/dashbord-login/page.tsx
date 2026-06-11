"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const DEFAULT_USER = "nedfteam";
  const DEFAULT_PASS = "nedf123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === DEFAULT_USER && password === DEFAULT_PASS) {
      localStorage.setItem("dashboardAuth", "true");
      router.push("/dashboard/overview");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    alert("For security, password resets must be handled by the site administrator.");
  };

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">NEDF Dashboard Login</h1>

      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <Button
        type="button"
        variant="link"
        onClick={handleForgotPassword}
        className="mx-auto mt-4 block h-auto p-0 text-sm"
      >
        Forgot Password?
      </Button>
    </div>
  );
}
