"use client";

// app/auth/register/page.js
import { useForm } from "react-hook-form";
import api from "../../services/api";
import { useRouter } from "next/navigation"; // Update this import

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter(); // This is now coming from 'next/navigation'

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);
      router.push("/auth/login"); // Use this to navigate after registration
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Input */}
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {/* Optional: Already have an account? Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-green-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
