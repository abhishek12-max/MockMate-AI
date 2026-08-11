import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#070707] p-6 lg:block">

      {/* Logo */}
      <Link
        to="/dashboard"
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

      {/* Navigation */}
      <nav className="mt-12 space-y-2">

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
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
          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
            isActive("/resume")
              ? "bg-white/10 text-white"
              : "text-gray-500 hover:bg-white/5 hover:text-white"
          }`}
        >
          Resume
        </Link>

        {/* Practice Interview */}
        <Link
          to="/interviews"
          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
            isActive("/interviews")
              ? "bg-white/10 text-white"
              : "text-gray-500 hover:bg-white/5 hover:text-white"
          }`}
        >
          Interviews
        </Link>

        {/* Interview History */}
        <Link
          to="/interviews/history"
          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
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
          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
            isActive("/reports")
              ? "bg-white/10 text-white"
              : "text-gray-500 hover:bg-white/5 hover:text-white"
          }`}
        >
          Reports
        </Link>

      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-6 right-6">

        <button
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default DashboardSidebar;