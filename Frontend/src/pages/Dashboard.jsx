import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH INTERVIEW HISTORY
  // ==========================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/interviews/history"
        );

        console.log(
          "DASHBOARD INTERVIEWS:",
          response.data
        );

        setInterviews(
          response.data?.interviews || []
        );

      } catch (error) {
        console.error(
          "DASHBOARD ERROR:",
          error.response?.data || error
        );

        setInterviews([]);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ==========================================
  // CALCULATE STATS
  // ==========================================

  const totalInterviews = interviews.length;

  const completedInterviews = interviews.filter(
    (interview) =>
      interview.status === "completed"
  );

  const completedCount =
    completedInterviews.length;

  const scoredInterviews =
    completedInterviews.filter(
      (interview) =>
        typeof interview.overallScore === "number"
    );

  const averageScore =
    scoredInterviews.length > 0
      ? (
          scoredInterviews.reduce(
            (total, interview) =>
              total + interview.overallScore,
            0
          ) / scoredInterviews.length
        ).toFixed(1)
      : "—";

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="lg:pl-40">

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">

          {/* ========================================
              WELCOME
          ======================================== */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <p className="text-sm uppercase tracking-[0.2em] text-gray-600">
              MockMate AI
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Ready for your next interview?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Upload your resume, start an AI-powered mock
              interview, and get personalized feedback to
              improve your performance.
            </p>

            <Link
              to="/resume"
              className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Upload Resume
            </Link>

          </div>


          {/* ========================================
              STATS
          ======================================== */}

          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

            {/* TOTAL INTERVIEWS */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">

              <p className="text-xs text-gray-500 sm:text-sm">
                Interviews
              </p>

              <p className="mt-3 text-2xl font-bold sm:text-3xl">
                {loading ? "..." : totalInterviews}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Total interviews
              </p>

            </div>


            {/* COMPLETED */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">

              <p className="text-xs text-gray-500 sm:text-sm">
                Completed
              </p>

              <p className="mt-3 text-2xl font-bold sm:text-3xl">
                {loading ? "..." : completedCount}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Completed interviews
              </p>

            </div>


            {/* AVERAGE SCORE */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">

              <p className="text-xs text-gray-500 sm:text-sm">
                Average Score
              </p>

              <p className="mt-3 text-2xl font-bold sm:text-3xl">
                {loading ? "..." : averageScore}
                {!loading &&
                  averageScore !== "—" && (
                    <span className="ml-1 text-sm text-gray-600">
                      /10
                    </span>
                  )}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Across completed interviews
              </p>

            </div>


            {/* RESUME */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">

              <p className="text-xs text-gray-500 sm:text-sm">
                Resume
              </p>

              <p className="mt-3 text-2xl font-bold sm:text-3xl">
                —
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Resume status
              </p>

            </div>

          </div>


          {/* ========================================
              QUICK ACTIONS
          ======================================== */}

          <div className="mt-8 sm:mt-10">

            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>


            <div className="mt-4 grid gap-4 md:grid-cols-3">

              {/* ====================================
                  UPLOAD RESUME
              ==================================== */}

              <Link
                to="/resume"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04] sm:p-6"
              >

                <p className="font-semibold">
                  Upload Resume
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Upload and analyze your resume with AI.
                </p>

                <p className="mt-5 text-sm text-gray-400 group-hover:text-white">
                  Get started →
                </p>

              </Link>


              {/* ====================================
                  START INTERVIEW
              ==================================== */}

              <Link
                to="/interviews/setup"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04] sm:p-6"
              >

                <p className="font-semibold">
                  Start Interview
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Practice a personalized AI mock interview.
                </p>

                <p className="mt-5 text-sm text-gray-400 group-hover:text-white">
                  Start now →
                </p>

              </Link>


              {/* ====================================
                  VIEW REPORTS
              ==================================== */}

              <Link
                to="/reports"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04] sm:p-6"
              >

                <p className="font-semibold">
                  View Reports
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Review your interview performance and feedback.
                </p>

                <p className="mt-5 text-sm text-gray-400 group-hover:text-white">
                  View reports →
                </p>

              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Dashboard;