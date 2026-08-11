import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">

      <div className="w-full max-w-md">

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

        <div className="mt-10 text-center">
          <h1 className="text-3xl font-bold">
            Verify your email
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Enter the 6-digit OTP sent to
            <br />
            <span className="text-gray-300">
              {email}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="000000"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none placeholder:text-gray-700 focus:border-white/30"
          />

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {loading
              ? "Verifying..."
              : "Verify Email"}
          </button>
        </form>

      </div>
    </main>
  );
};

export default VerifyOtp;