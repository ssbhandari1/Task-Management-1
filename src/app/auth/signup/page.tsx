"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/api/auth/signup", { username, email, password });
      alert("Signup successful!");
      router.push("/auth/login");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };


  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-auto  text-left flex justify-center rounded-md px-4 py-3  sm:p-10 shadow-xl bg-white">
        <div className="w-full">
          <div className="text-center mb-3">
            <h2 className="text-3xl font-bold font-serif text-blue-500">Sign Up</h2>
            <p className="text-sm md:text-base text-gray-500 text-center py-3">
              Create your account in Task Management
            </p>
            {error && <p className="text-sm md:text-base text-red-600 text-center">

              {error}</p>}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Name
                </label>
                <div className="relative">

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    autoComplete="email"
                    className={`py-2 pl-3 w-full border ${error ? 'border-red-600' : ''} text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Email
                </label>
                <div className="relative">

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`py-2 pl-3 w-full border ${error ? 'border-red-600' : ''} text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11`}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Password
                </label>
                <div className="relative">

                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    autoComplete="current-password"
                    className={`py-2 pl-3 w-full border ${error ? 'border-red-600' : ''} text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11`}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Confirm Password
                </label>
                <div className="relative">

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`py-2 pl-3 w-full border ${error ? 'border-red-600' : ''} text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-900 mt-4">
            <div className="text-gray-500 mt-2.5">
              Already have an account?
              <span className="capitalize text-gray-800 hover:text-cyan-500 font-bold mx-2 cursor-pointer">
                <Link href="/auth/login"> Log in</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;