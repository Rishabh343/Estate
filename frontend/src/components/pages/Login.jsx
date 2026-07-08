import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-900 to-indigo-800 text-white px-10 py-8">

          <h1 className="text-4xl font-bold">
            Estate<span className="text-yellow-400">Hub</span>
          </h1>

          <p className="mt-4 text-blue-100 leading-7">
            Welcome back! Sign in to manage your properties, explore listings,
            approve bookings, and connect with buyers and owners.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Verified Property Listings</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Secure Property Management</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Fast Booking Approvals</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Trusted Real Estate Platform</span>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-1 mb-6">
            Login to continue to your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="rounded"
                />
                Remember Me
              </label>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <button className="text-blue-700 font-semibold hover:underline">
              Create Account
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}