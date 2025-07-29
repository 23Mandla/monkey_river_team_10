"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Call your login API endpoint
      const response = await axios.post("/api/userapi/login", { email, password });
      
      // Assuming your API returns token in response.data.token
      const token = response.data.token;
      if (token) {
        // Save JWT token in a cookie (expires in 1 day)
        Cookies.set("token", token, { expires: 1 });
        
        // Redirect to profile page
        router.push("/profile");
      } else {
        setError("Login failed: no token received");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-600">{error}</p>}

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

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}
