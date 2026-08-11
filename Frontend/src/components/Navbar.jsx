import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* ==========================================
          DESKTOP + MOBILE TOP NAVBAR
      ========================================== */}

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
              M
            </div>

            <span className="text-xl font-semibold tracking-tight text-white">
              MockMate
              <span className="text-gray-400"> AI</span>
            </span>
          </Link>

          {/* ==========================================
              DESKTOP NAVIGATION
          ========================================== */}

          <div className="hidden items-center gap-8 md:flex">

            <Link
              to="/features"
              className={`text-sm transition ${
                isActive("/features")
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Features
            </Link>

            <Link
              to="/how-it-works"
              className={`text-sm transition ${
                isActive("/how-it-works")
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              How It Works
            </Link>

            <Link
              to="/why-mockmate"
              className={`text-sm transition ${
                isActive("/why-mockmate")
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Why MockMate
            </Link>

          </div>

          {/* ==========================================
              DESKTOP ACTIONS
          ========================================== */}

          <div className="hidden items-center gap-3 sm:flex">

            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm text-gray-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Get Started
            </Link>

          </div>

          {/* ==========================================
              MOBILE HAMBURGER
          ========================================== */}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:border-white/20 hover:text-white sm:hidden"
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

        </div>
      </nav>

      {/* ==========================================
          MOBILE OVERLAY
      ========================================== */}

      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* ==========================================
          MOBILE DRAWER
      ========================================== */}

      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[82%] max-w-sm border-l border-white/10 bg-[#070707] p-5 transition-transform duration-300 sm:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Drawer Header */}

        <div className="flex items-center justify-between">

          <Link
            to="/"
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

          {/* Close Button */}

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
            MOBILE NAVIGATION
        ========================================== */}

        <nav className="mt-10 space-y-2">

          <Link
            to="/features"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/features")
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Features
          </Link>

          <Link
            to="/how-it-works"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/how-it-works")
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            How It Works
          </Link>

          <Link
            to="/why-mockmate"
            onClick={closeMenu}
            className={`block rounded-xl px-4 py-3.5 text-sm font-medium transition ${
              isActive("/why-mockmate")
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Why MockMate
          </Link>

        </nav>

        {/* ==========================================
            MOBILE ACTIONS
        ========================================== */}

        <div className="absolute bottom-6 left-5 right-5 space-y-3">

          <Link
            to="/login"
            onClick={closeMenu}
            className="block w-full rounded-xl border border-white/10 px-4 py-3.5 text-center text-sm font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={closeMenu}
            className="block w-full rounded-xl bg-white px-4 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Get Started
          </Link>

        </div>

      </aside>
    </>
  );
};

export default Navbar;