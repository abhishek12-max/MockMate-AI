import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
            M
          </div>

          <span className="text-xl font-semibold tracking-tight">
            MockMate
            <span className="text-gray-400"> AI</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/features"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            to="/how-it-works"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            How It Works
          </Link>

          <Link
            to="/why-mockmate"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Why MockMate
          </Link>

        </div>

        {/* Actions */}
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

        {/* Mobile Menu */}
        <button className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 sm:hidden">
          Menu
        </button>

      </div>
    </nav>
  );
};

export default Navbar;