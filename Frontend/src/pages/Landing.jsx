import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import LazyCube from "../components/LazyCube";
import ProductPreview from "../components/ProductPreview";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen px-6 pt-20">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center gap-8 lg:flex-row lg:justify-between">

          {/* Cube */}
          <div className="order-1 flex shrink-0 items-center justify-center lg:order-2">
            <LazyCube />
          </div>

          {/* Hero Content */}
          <div className="order-2 max-w-3xl text-center lg:order-1 lg:text-left">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              AI-Powered Interview Preparation
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Practice Smarter.
              <br />

              <span className="text-gray-400">
                Interview Better.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg lg:mx-0">
              Practice realistic interviews with AI, get instant feedback,
              identify your skill gaps, and become interview-ready with
              personalized preparation.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">

              <Link
                to="/register"
                className="w-full rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto"
              >
                Start Practicing
              </Link>

              <Link
                to="/how-it-works"
                className="w-full rounded-xl border border-white/15 px-7 py-3.5 text-sm font-medium text-gray-300 transition hover:border-white/30 hover:text-white sm:w-auto"
              >
                See How It Works
              </Link>

            </div>

          </div>
        </div>
      </section>

      <ProductPreview />

    
      <FinalCTA />

     
      <Footer />
    </main>
  );
};

export default Landing;