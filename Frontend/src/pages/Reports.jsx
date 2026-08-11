import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/interviews/history"
        );

        console.log(
          "REPORTS DATA:",
          response.data
        );

        const interviews =
          response.data?.interviews || [];

        const completedInterviews =
          interviews.filter(
            (interview) =>
              interview.status === "completed"
          );

        setReports(completedInterviews);

      } catch (error) {
        console.error(
          "REPORTS ERROR:",
          error.response?.data || error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load reports."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
              MockMate AI
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Reports
            </h1>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

            <p className="mt-4 text-sm text-gray-500">
              Loading your reports...
            </p>

          </div>

        </div>

      </main>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
              MockMate AI
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Reports
            </h1>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-sm text-red-400">
            {error}
          </div>

        </div>

      </main>
    );
  }

  // ======================================
  // EMPTY STATE
  // ======================================

  if (reports.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">

            <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
              MockMate AI
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Reports
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review your completed interview performance.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">

            <p className="text-lg font-medium">
              No reports yet
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Complete an AI mock interview to generate
              your first performance report.
            </p>

            <Link
              to="/interviews/setup"
              className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Start Interview
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // ======================================
  // REPORTS UI
  // ======================================

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
            MockMate AI
          </p>

          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Interview Reports
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your completed interviews and performance.
          </p>

        </div>

        {/* Reports Grid */}
        <div className="grid gap-4 md:grid-cols-2">

          {reports.map((report) => (

            <div
              key={report._id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs uppercase tracking-[0.15em] text-gray-600">
                    Completed Interview
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {report.role ||
                      "Technical Interview"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {report.interviewType ||
                      "Mixed Interview"}
                  </p>

                </div>

                {/* Score */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">

                  <p className="text-[10px] uppercase tracking-wide text-gray-600">
                    Score
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {report.overallScore ?? "--"}
                  </p>

                  <p className="text-[10px] text-gray-600">
                    /10
                  </p>

                </div>

              </div>

              {/* Date */}
              <div className="mt-6 border-t border-white/10 pt-4">

                <p className="text-xs text-gray-600">
                  Completed on
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {report.createdAt
                    ? new Date(
                        report.createdAt
                      ).toLocaleDateString()
                    : "Recently"}
                </p>

              </div>

              {/* Action */}
              <Link
                to={`/interviews/${report._id}/report`}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                View Full Report →
              </Link>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
};

export default Reports;