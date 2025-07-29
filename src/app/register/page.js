"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your register API endpoint
      await axios.post("/api/userapi/register", { name, email, password });
      router.push("/login"); // Redirect after successful signup
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </main>
  );
}
