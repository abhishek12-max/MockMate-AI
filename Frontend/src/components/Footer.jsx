import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
              M
            </div>

            <span className="font-semibold">
              MockMate
              <span className="text-gray-500"> AI</span>
            </span>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            AI-powered interview preparation.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
          <Link to={"/features"}
            
            className="transition hover:text-white"
          >
            Features
          </Link>

          <Link
           to={"/how-it-works"}
            className="transition hover:text-white"
          >
            How It Works
          </Link>

          <a
            href="#"
            className="transition hover:text-white"
          >
            Privacy
          </a>

          <a
            href="#"
            className="transition hover:text-white"
          >
            Terms
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 pt-6">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} MockMate AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;