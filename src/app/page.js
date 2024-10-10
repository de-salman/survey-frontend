// app/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="sm:text-3xl md:text-4xl  font-bold text-gray-800 mb-8">
        Welcome to the Survey App
      </h1>

      {/* Conditionally show login/register or create/view options */}
      <div className="flex flex-row space-x-4">
        {" "}
        {/* Adds space between buttons */}
        {!isLoggedIn ? (
          <>
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition duration-300"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/create"
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
            >
              Create Survey
            </Link>
            <Link
              href="/survey"
              className="bg-purple-500 text-white py-2 px-6 rounded hover:bg-purple-600 transition duration-300"
            >
              View Surveys
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
