"use client";

import { useState, useEffect } from "react";

export default function UserProfile() {
  
  const [user, setUser] = useState();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

    if (!user) return <p>No user found.</p>;

  return (
    <div className=" max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className=" text-2xl font-bold text-center text-black">User Profile</h2>
      <div className="text-black" >
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete Profile
        </button>
      </div>
    </div>
  );
}
