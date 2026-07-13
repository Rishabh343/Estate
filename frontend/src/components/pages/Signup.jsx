import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "buyer",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Remove confirmPassword before sending data
      const { confirmPassword, ...userData } = formData;

      const response = await axios.post(
        "https://estate-backend-1xrm.onrender.com/api/user/register",
        userData,
        {
          withCredentials: true,
        },
      );

      alert(response.data.message);
      console.log(response.data);
      navigate("/login");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "buyer",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#eeeae3] flex items-center justify-center px-4 py-6">
      {/* Main Container */}

      <div className="w-full max-w-5xl min-h-[600px] bg-[#faf9f6] rounded-[24px] shadow-2xl shadow-stone-400/20 overflow-hidden grid lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}

        <div className="hidden lg:flex relative overflow-hidden">
          {/* Background Image */}

          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400"
            alt="Luxury property"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

          {/* Content */}

          <div className="relative z-10 flex flex-col justify-between w-full p-8 text-white">
            {/* Logo */}

            <h1 className="text-3xl font-semibold tracking-tight">Estate</h1>

            {/* Bottom Content */}

            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-3">
                Your journey starts here
              </p>

              <h2 className="text-3xl xl:text-4xl font-medium leading-tight">
                Find a place
                <br />
                that feels like
                <br />
                home.
              </h2>

              <p className="mt-5 text-sm text-white/75 leading-6">
                Create your account to discover exceptional properties, connect
                with trusted owners, and manage your real estate journey.
              </p>

              {/* Features */}

              <div className="flex items-center gap-4 mt-6 text-xs text-white/80">
                <span>Verified Listings</span>

                <span className="w-1 h-1 rounded-full bg-white/60" />

                <span>Trusted Owners</span>

                <span className="w-1 h-1 rounded-full bg-white/60" />

                <span>Easy Booking</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center justify-center px-6 py-8 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}

            <h1 className="lg:hidden text-3xl font-semibold text-stone-900 mb-8">
              Estate
            </h1>

            {/* Heading */}

            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-medium mb-2">
                Join Estate
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                Create your account
              </h2>

              <p className="text-sm text-stone-500 mt-2">
                Start your real estate journey today.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}

              <div>
                <label className="block text-sm font-medium mb-1.5 text-stone-700">
                  Full name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="
                w-full
                bg-transparent
                border border-stone-300
                rounded-xl
                px-4 py-2.5
                text-stone-900
                placeholder:text-stone-400
                outline-none
                focus:border-stone-900
                focus:ring-1
                focus:ring-stone-900
                transition
              "
                />
              </div>

              {/* Email */}

              <div>
                <label className="block text-sm font-medium mb-1.5 text-stone-700">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                w-full
                bg-transparent
                border border-stone-300
                rounded-xl
                px-4 py-2.5
                text-stone-900
                placeholder:text-stone-400
                outline-none
                focus:border-stone-900
                focus:ring-1
                focus:ring-stone-900
                transition
              "
                />
              </div>

              {/* Phone and Role */}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-stone-700">
                    Phone number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="
                  w-full
                  bg-transparent
                  border border-stone-300
                  rounded-xl
                  px-4 py-2.5
                  text-stone-900
                  placeholder:text-stone-400
                  outline-none
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                  transition
                "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-stone-700">
                    Account type
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="
                  w-full
                  bg-transparent
                  border border-stone-300
                  rounded-xl
                  px-4 py-2.5
                  text-stone-900
                  outline-none
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                  transition
                "
                  >
                    <option value="buyer">Buyer</option>
                    <option value="owner">Property Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Passwords */}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-stone-700">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="
                  w-full
                  bg-transparent
                  border border-stone-300
                  rounded-xl
                  px-4 py-2.5
                  text-stone-900
                  placeholder:text-stone-400
                  outline-none
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                  transition
                "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-stone-700">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="
                  w-full
                  bg-transparent
                  border border-stone-300
                  rounded-xl
                  px-4 py-2.5
                  text-stone-900
                  placeholder:text-stone-400
                  outline-none
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                  transition
                "
                  />
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="
              w-full
              bg-stone-900
              hover:bg-stone-800
              text-white
              font-medium
              py-3
              rounded-xl
              transition-all
              duration-300
              hover:shadow-lg
              hover:shadow-stone-900/10
              mt-2
            "
              >
                Create Account
              </button>
            </form>

            {/* Login */}

            <p className="text-center mt-6 text-sm text-stone-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-stone-900 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
