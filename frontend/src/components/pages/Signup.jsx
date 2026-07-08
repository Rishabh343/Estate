import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "buyer",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
            Find your dream home, list your property, connect with buyers, and
            manage everything from one secure platform.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Verified Property Listings</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Easy Property Booking</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Trusted Buyers & Owners</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✔</span>
              <span>Fast & Secure Platform</span>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>

          <p className="text-slate-500 mt-1 mb-6">Join EstateHub today.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
            >
              <option value="buyer">Buyer</option>
              <option value="owner">Property Owner</option>
              <option value="agent">Admin</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <button className="text-blue-700 font-semibold hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
