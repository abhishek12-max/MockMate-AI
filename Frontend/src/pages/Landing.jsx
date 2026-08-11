import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import LazyCube from "../components/LazyCube";
import ProductPreview from "../components/ProductPreview";
import FinalCTA from "../components/FinalCTA";


const Landing = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section
        className="
          px-6
          pt-20
          sm:px-8
          sm:pt-24
          lg:px-8
          lg:pt-10
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-center
            gap-6

            lg:min-h-[calc(100vh-80px)]
            lg:flex-row
            lg:items-start
            lg:justify-between
            lg:gap-12
            lg:pt-16
          "
        >
          {/* ==========================================
              CUBE

              Mobile  -> TOP + slightly higher
              Tablet  -> TOP
              Desktop -> RIGHT + higher
          ========================================== */}

          <div
            className="
              order-1
              flex
              w-full
              shrink-0
              -translate-y-6
              items-center
              justify-center

              lg:order-2
              lg:w-1/2
              lg:translate-y-0
            "
          >
            <LazyCube  />
          </div>

          {/* ==========================================
              HERO CONTENT

              Mobile  -> BELOW CUBE
              Tablet  -> BELOW CUBE
              Desktop -> LEFT + higher
          ========================================== */}

          <div
            className="
              order-2
              w-full
              max-w-3xl
              text-center

              lg:order-1
              lg:w-1/2
              lg:pt-6
              lg:text-left
            "
          >
            <p
              className="
                mb-4
                text-sm
                font-medium
                uppercase
                tracking-[0.25em]
                text-gray-500
              "
            >
              AI-Powered Interview Preparation
            </p>

            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Practice Smarter.
              <br />

              <span className="text-gray-400">
                Interview Better.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-gray-400
                sm:text-base

                lg:mx-0
                lg:text-lg
              "
            >
              Practice realistic interviews with AI, get instant feedback,
              identify your skill gaps, and become interview-ready with
              personalized preparation.
            </p>

            {/* ==========================================
                BUTTONS
            ========================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3

                sm:flex-row

                lg:justify-start
              "
            >
              <Link
                to="/register"
                className="
                  w-full
                  rounded-xl
                  bg-white
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-gray-200
                  sm:w-auto
                "
              >
                Start Practicing
              </Link>

              <Link
                to="/how-it-works"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/15
                  px-7
                  py-3.5
                  text-sm
                  font-medium
                  text-gray-300
                  transition
                  hover:border-white/30
                  hover:text-white
                  sm:w-auto
                "
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          PRODUCT PREVIEW
      ========================================== */}

      <ProductPreview />

      {/* ==========================================
          FINAL CTA
      ========================================== */}

      <FinalCTA />

      
    </main>
  );
};

export default Landing;