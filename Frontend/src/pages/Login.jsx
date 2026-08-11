import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  // ==========================================
  // STATE
  // ==========================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

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
  // NORMAL LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      if (response.data?.success) {
        navigate("/dashboard", {
          replace: true,
        });
      } else {
        setError(
          response.data?.message || "Login failed."
        );
      }
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE LOGIN
  // ==========================================

  const handleGoogleLogin = () => {
    try {
      setGoogleLoading(true);
      setError("");

      // Backend Google OAuth route
      window.location.href =
        "http://localhost:5000/api/auth/google";
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      setGoogleLoading(false);

      setError(
        "Unable to continue with Google."
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#050505] px-6 py-12 text-white">
      <div className="mx-auto flex max-w-md justify-center">
        <div className="w-full">

          {/* =====================================
              HEADER
          ===================================== */}

          <div className="text-center">

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-600">
              MockMate AI
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Sign in to continue your AI-powered
              interview preparation.
            </p>

          </div>

          {/* =====================================
              ERROR
          ===================================== */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* =====================================
              LOGIN FORM
          ===================================== */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          >

            {/* =====================================
                EMAIL
            ===================================== */}

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
                placeholder="Enter your email"
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-white/30"
              />

            </div>

            {/* =====================================
                PASSWORD
            ===================================== */}

            <div className="mt-5">

              <div className="flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 transition hover:text-white"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative mt-2">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 pr-12 text-sm text-white outline-none placeholder:text-gray-700 transition focus:border-white/30"
                />

                {/* Password Toggle */}

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

            {/* =====================================
                LOGIN BUTTON
            ===================================== */}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="mt-6 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Sign In →"}
            </button>

            {/* =====================================
                DIVIDER
            ===================================== */}

            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-gray-600">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            {/* =====================================
                GOOGLE LOGIN
            ===================================== */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/20 px-6 py-3.5 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >

              {googleLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />

                  <span>
                    Connecting to Google...
                  </span>
                </>
              ) : (
                <>
                  {/* Google Icon */}

                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                    />

                    <path
                      fill="#34A853"
                      d="M12 21.75c2.63 0 4.84-.87 6.46-2.36l-3.14-2.45c-.87.58-1.98.92-3.32.92-2.55 0-4.71-1.72-5.48-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.75Z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M6.52 13.83A5.86 5.86 0 0 1 6.21 12c0-.64.11-1.26.31-1.83V7.64H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.36l3.24-2.53Z"
                    />

                    <path
                      fill="#EA4335"
                      d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.22 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.39l3.24 2.53C6.29 7.86 8.45 6.14 12 6.14Z"
                    />
                  </svg>

                  <span>
                    Continue with Google
                  </span>
                </>
              )}

            </button>

          </form>

          {/* =====================================
              REGISTER
          ===================================== */}

          <div className="mt-6 text-center">

            <p className="text-sm text-gray-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-white transition hover:text-gray-300"
              >
                Create one
              </Link>

            </p>

          </div>

        </div>
      </div>
    </main>
  );
};

export default Login;