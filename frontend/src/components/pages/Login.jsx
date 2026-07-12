import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
        {
          withCredentials: true,
        },
      );
      // alert(response.data.message);
      console.log(response.data);
      const role = response.data.role;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      console.log(role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/buyer/properties");
      }
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
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
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400"
        alt="Luxury property"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

      {/* Content */}

      <div className="relative z-10 flex flex-col justify-between w-full p-8 text-white">
        {/* Logo */}

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Estate
          </h1>
        </div>

        {/* Bottom Content */}

        <div className="max-w-md">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-3">
            Find your perfect place
          </p>

          <h2 className="text-3xl xl:text-4xl font-medium leading-tight">
            Where exceptional
            <br />
            properties meet
            <br />
            extraordinary living.
          </h2>

          <p className="mt-5 text-sm text-white/75 leading-6">
            Discover thoughtfully selected homes and manage your real estate
            journey from one trusted platform.
          </p>

          {/* Small Features */}

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
      <div className="w-full max-w-sm">
        {/* Mobile Logo */}

        <h1 className="lg:hidden text-3xl font-semibold text-stone-900 mb-8">
          Estate
        </h1>

        {/* Heading */}

        <div className="mb-7">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-medium mb-2">
            Welcome back
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
            Sign in to Estate
          </h2>

          <p className="text-sm text-stone-500 mt-2 leading-6">
            Enter your details to access your account.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}

          <div>
            <label className="block text-sm font-medium mb-2 text-stone-700">
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
                px-4 py-3
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

          {/* Password */}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-stone-700">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-stone-600 hover:text-stone-900 transition"
              >
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                bg-transparent
                border border-stone-300
                rounded-xl
                px-4 py-3
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

          {/* Remember */}

          <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer w-fit">
            <input
              type="checkbox"
              className="w-4 h-4 accent-stone-900"
            />

            Remember me
          </label>

          {/* Login Button */}

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
            "
          >
            Login
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-stone-200" />

          <span className="text-[11px] uppercase tracking-widest text-stone-400">
            New to Estate?
          </span>

          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* Signup */}

        <Link
          to="/signup"
          className="
            w-full
            border border-stone-300
            text-stone-800
            font-medium
            py-3
            rounded-xl
            transition
            hover:bg-stone-100
            flex items-center
            justify-center
          "
        >
          Create an account
        </Link>

        {/* Footer */}

        <p className="text-center text-xs text-stone-400 mt-7">
          By continuing, you agree to Estate's terms and privacy policy.
        </p>
      </div>
    </div>
  </div>
</div>
  );
}
