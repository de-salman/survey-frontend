"use client";

// app/auth/login/page.js
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter(); // This is now coming from 'next/navigation'

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const { token } = response.data; // Assuming your API returns the token

      // Save token in local storage
      localStorage.setItem("token", token);

      // Redirect to dashboard or create a survey
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Input */}
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Optional: Forgot Password Link */}
        <div className="text-center mt-4">
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Not registered yet? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
