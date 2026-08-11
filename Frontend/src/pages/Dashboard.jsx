import { Link } from "react-router-dom";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <DashboardSidebar />

      <div className="lg:pl-64">

        <DashboardNavbar />

        <section className="mx-auto max-w-7xl px-6 py-10">

          {/* Welcome */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">

            <p className="text-sm uppercase tracking-[0.2em] text-gray-600">
              MockMate AI
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Ready for your next interview?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Upload your resume, start an AI-powered mock interview,
              and get personalized feedback to improve your performance.
            </p>

            <Link
              to="/resume"
              className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Upload Resume
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm text-gray-500">
                Interviews
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <p className="mt-3 text-3xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm text-gray-500">
                Average Score
              </p>

              <p className="mt-3 text-3xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm text-gray-500">
                Resume
              </p>

              <p className="mt-3 text-3xl font-bold">
                —
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-10">

            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-3">

              <Link
                to="/resume"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
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

              <Link
                to="/interviews"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
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

              <Link
                to="/reports"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
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