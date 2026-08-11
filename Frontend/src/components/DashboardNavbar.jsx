import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { logoutUser } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logoutUser();

      setIsOpen(false);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      navigate("/login", {
        replace: true,
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* ==========================================
          MOBILE TOPBAR
      ========================================== */}

      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#070707]/95 px-4 backdrop-blur-xl lg:hidden">

        {/* Logo */}

        <Link
          to="/dashboard"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
            M
          </div>

          <span className="text-lg font-semibold text-white">
            MockMate
            <span className="text-gray-500"> AI</span>
          </span>
        </Link>

        {/* Hamburger */}

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:border-white/20 hover:text-white"
          aria-label="Open navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </header>

      {/* ==========================================
          OVERLAY
      ========================================== */}

      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ==========================================
          MOBILE DRAWER
      ========================================== */}

      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[82%] max-w-sm border-l border-white/10 bg-[#070707] p-5 transition-transform duration-300 lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}

        <div className="flex items-center justify-between">

          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
              M
            </div>

            <span className="text-lg font-semibold text-white">
              MockMate
              <span className="text-gray-500"> AI</span>
            </span>
          </Link>

          {/* Close */}

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-white/20 hover:text-white"
            aria-label="Close navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

        {/* ==========================================
            NAVIGATION
        ========================================== */}

        <nav className="mt-10 space-y-2">

          {/* Dashboard */}

          <Link
            to="/dashboard"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/dashboard")
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            Dashboard
          </Link>

          {/* Resume */}

          <Link
            to="/resume"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/resume")
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            Resume
          </Link>

          {/* Interviews */}

          <Link
            to="/interviews/setup"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              location.pathname.startsWith("/interviews") &&
              !location.pathname.includes("/history")
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            Interviews
          </Link>

          {/* Interview History */}

          <Link
            to="/interviews/history"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/interviews/history")
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            Interview History
          </Link>

          {/* Reports */}

          <Link
            to="/reports"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/reports")
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            Reports
          </Link>

        </nav>

        {/* ==========================================
            LOGOUT
        ========================================== */}

        <div className="absolute bottom-6 left-5 right-5">

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full rounded-xl border border-white/10 px-4 py-3.5 text-sm text-gray-400 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut
              ? "Logging out..."
              : "Logout"}
          </button>

        </div>

      </aside>
    </>
  );
};

export default DashboardNavbar;