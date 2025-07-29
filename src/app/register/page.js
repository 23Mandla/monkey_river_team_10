"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/userapi/users", { name, email, password });
      Cookies.set("token", response.data.token); // if your API returns token on signup
      setLoading(false);
      router.push("/profile"); // redirect after register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-800/80 backdrop-blur-md rounded-xl shadow-xl max-w-md w-full p-10 space-y-8
                   text-white transform transition-transform duration-500 hover:scale-[1.03]"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">Create your Account</h2>

        {error && (
          <div className="bg-red-700 p-3 rounded text-center text-sm animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="name" className="block font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-indigo-900 px-4 py-3 placeholder-indigo-400
                       focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                       transition-colors duration-300"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-indigo-900 px-4 py-3 placeholder-indigo-400
                       focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                       transition-colors duration-300"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-indigo-900 px-4 py-3 placeholder-indigo-400
                       focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                       transition-colors duration-300"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="confirm" className="block font-semibold">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            required
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-md bg-indigo-900 px-4 py-3 placeholder-indigo-400
                       focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                       transition-colors duration-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 transition-colors duration-300
                     font-bold py-3 rounded-md shadow-lg transform active:scale-95"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-indigo-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-300"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
