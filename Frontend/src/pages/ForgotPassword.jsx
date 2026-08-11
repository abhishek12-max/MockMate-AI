import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // SEND OTP
  // ==========================================

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/forgot-password",
        {
          email: formData.email,
        }
      );

      console.log(
        "FORGOT PASSWORD RESPONSE:",
        response.data
      );

      setSuccess(
        "Password reset OTP has been sent to your email."
      );

      setStep(2);
    } catch (error) {
      console.error(
        "FORGOT PASSWORD ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to send reset OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (!formData.newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/reset-password",
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );

      console.log(
        "RESET PASSWORD RESPONSE:",
        response.data
      );

      setSuccess(
        "Password reset successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "RESET PASSWORD ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#050505] px-6 py-12 text-white">

      <div className="mx-auto flex max-w-md justify-center">

        <div className="w-full">

          {/* Header */}

          <div className="text-center">

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-600">
              MockMate AI
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              {step === 1
                ? "Forgot your password?"
                : "Reset your password"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {step === 1
                ? "Enter your registered email and we'll send you a reset OTP."
                : "Enter the OTP sent to your email and create a new password."}
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* ==========================================
              STEP 1
          ========================================== */}

          {step === 1 && (
            <form
              onSubmit={handleSendOtp}
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-700 focus:border-white/30"
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Sending OTP..."
                  : "Send Reset OTP →"}
              </button>

              {/* Back Login */}

              <div className="mt-6 text-center">

                <Link
                  to="/login"
                  className="text-sm text-gray-500 transition hover:text-white"
                >
                  ← Back to Login
                </Link>

              </div>

            </form>
          )}

          {/* ==========================================
              STEP 2
          ========================================== */}

          {step === 2 && (
            <form
              onSubmit={handleResetPassword}
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >

              {/* Email */}

              <div>

                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-gray-500 outline-none"
                />

              </div>

              {/* OTP */}

              <div className="mt-5">

                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-gray-300"
                >
                  OTP
                </label>

                <input
                  id="otp"
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  inputMode="numeric"
                  maxLength={6}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-center text-lg tracking-[0.35em] text-white outline-none placeholder:text-gray-700 placeholder:tracking-normal focus:border-white/30"
                />

              </div>

              {/* New Password */}

              <div className="mt-5">

                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  New Password
                </label>

                <div className="relative mt-2">

                  <input
                    id="newPassword"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 pr-12 text-sm text-white outline-none placeholder:text-gray-700 focus:border-white/30"
                  />

                  {/* Eye */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white transition hover:text-gray-300"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.5 12s3.5 6 10.5 6c1.68 0 3.17-.38 4.46-.98M9.88 9.88a3 3 0 1 0 4.24 4.24M6.1 6.1C7.7 5.4 9.65 5 12 5c7 0 10.5 7 10.5 7a18.3 18.3 0 0 1-3.12 3.92M1.5 1.5l21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        />
                      </svg>
                    )}
                  </button>

                </div>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Resetting Password..."
                  : "Reset Password →"}
              </button>

              {/* Back */}

              <div className="mt-6 text-center">

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-sm text-gray-500 transition hover:text-white"
                >
                  ← Change Email
                </button>

              </div>

            </form>
          )}

        </div>

      </div>

    </main>
  );
};

export default ForgotPassword;