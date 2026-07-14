import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import api from "../../services/api";

export default function ForgotPassword({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.put("/user/forgot-password", formData);

      setSuccess(response.data.message || "Password updated successfully");

      setFormData({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Close modal after success
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  // Auto remove error
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Background */}
      <div className="fixed inset-0 z-[60] bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="
            pointer-events-auto
            relative
            w-full
            max-w-md
            rounded-2xl
            bg-[#faf9f6]
            p-7
            shadow-2xl
          "
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-5
              top-5
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-stone-500
              transition
              hover:bg-stone-100
              hover:text-stone-900
            "
          >
            <X size={20} />
          </button>

          {/* Heading */}
          <div className="mb-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Account Recovery
            </p>

            <h2 className="text-2xl font-semibold text-stone-900">
              Reset your password
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Enter your registered email and choose a new password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-stone-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-stone-900
                  outline-none
                  transition
                  placeholder:text-stone-400
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                "
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                New password
              </label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                minLength={6}
                className="
                  w-full
                  rounded-xl
                  border
                  border-stone-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-stone-900
                  outline-none
                  transition
                  placeholder:text-stone-400
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Confirm password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                minLength={6}
                className="
                  w-full
                  rounded-xl
                  border
                  border-stone-300
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-stone-900
                  outline-none
                  transition
                  placeholder:text-stone-400
                  focus:border-stone-900
                  focus:ring-1
                  focus:ring-stone-900
                "
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle size={17} />
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                w-full
                rounded-xl
                bg-stone-900
                py-3
                font-medium
                text-white
                transition
                hover:bg-stone-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Updating Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
