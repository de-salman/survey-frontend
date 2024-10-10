"use client";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // 'next/navigation' for programmatic navigation
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, [pathname]);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth/login"); // Redirect to login page after logout
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Conditionally render the logout button if logged in */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )}

        {children}
      </body>
    </html>
  );
}
