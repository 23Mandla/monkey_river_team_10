"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // start logged out for demo
  const router = useRouter();

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push("/profile");
  };

  // No logout button, replaced with Register link as per your request

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between">
      <Link href="/" className="text-xl font-bold">
        MyApp
      </Link>
      <div className="space-x-4 flex items-center">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        {isLoggedIn ? (
          <>
            <Link href="/profile">Profile</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/login" onClick={handleLogin}>Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
