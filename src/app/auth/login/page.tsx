"use client";
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

const Page = () => {
  const { login, error } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData, '/backlog');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full mt-10 sm:w-auto text-left flex justify-center rounded-md px-4 py-8 sm:p-10 shadow-xl bg-white">
        <div className="w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold font-serif text-blue-500">Login</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
              Login with your email and password
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5">
              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                    <MdOutlineMailOutline className="text-gray-400" />
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    autoComplete="email"
                    className={`py-2 pl-10 w-full border ${error ? 'border-red-600' : ''} text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11`}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-gray-500 font-medium text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
                    <FiLock className="text-gray-400" />
                  </span>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    autoComplete="current-password"
                    className={`py-2 pl-10 w-full border ${error ? 'border-red-600' : ''} text-sm text-gray-900 rounded-md transition focus:outline-none focus:border-emerald-500 h-11`}
                  />
                </div>
              </div>
              <button
              type="submit"
              className="w-full py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition cursor-pointer"
            >
                Login
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-900 mt-4">
            <div className="text-gray-500 mt-2.5">
              Dont have an account?
              <span className="capitalize text-gray-800 hover:text-cyan-500 font-bold mx-2 cursor-pointer">
              <Link href="/auth/signup"> Sign Up</Link> 
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;