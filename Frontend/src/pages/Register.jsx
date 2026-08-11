import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.fullname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* Logo */}

          <Link
            to="/"
            className="mx-auto flex w-fit items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-bold text-black">
              M
            </div>

            <span className="text-xl font-semibold">
              MockMate
              <span className="text-gray-500"> AI</span>
            </span>
          </Link>

          {/* Heading */}

          <div className="mt-10 text-center">
            <h1 className="text-3xl font-bold">
              Create your account
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Start preparing for your next interview.
            </p>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Full Name */}

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-700 focus:border-white/30"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-700 focus:border-white/30"
              />
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-gray-700 focus:border-white/30"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-white transition hover:text-gray-300"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (

                    /* Eye Off */

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

                    /* Eye */

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

            {/* Confirm Password */}

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-gray-700 focus:border-white/30"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-white transition hover:text-gray-300"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (

                    /* Eye Off */

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

                    /* Eye */

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

            {/* Error */}

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-white transition hover:text-gray-300"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Register;