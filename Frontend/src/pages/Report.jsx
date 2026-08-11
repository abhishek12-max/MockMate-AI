import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const Report = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET INTERVIEW REPORT
  // ==========================================

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("FETCHING REPORT:", interviewId);

        const response = await api.get(
          `/interviews/${interviewId}/report`
        );

        console.log(
          "INTERVIEW REPORT:",
          response.data
        );

        setReport(
          response.data?.report ||
            response.data
        );

      } catch (error) {
        console.error(
          "REPORT ERROR:",
          error.response?.data || error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load interview report."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [interviewId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-gray-500">
            Generating your interview report...
          </p>

        </div>

      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">

        <div className="text-center">

          <p className="text-red-400">
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="mt-5 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black"
          >
            Back to Dashboard
          </button>

        </div>

      </main>
    );
  }

  if (!report) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
            MockMate AI
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Interview Complete.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Here's how you performed and what you
            should focus on next.
          </p>

        </div>

        {/* ====================================
            SCORE CARDS
        ==================================== */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          {/* Overall Score */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
              Overall Score
            </p>

            <div className="mt-4 flex items-end gap-2">

              <span className="text-5xl font-bold">
                {report.overallScore ?? 0}
              </span>

              <span className="mb-2 text-sm text-gray-600">
                / 10
              </span>

            </div>

          </div>

          {/* Readiness */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
              Interview Readiness
            </p>

            <div className="mt-4 flex items-end gap-2">

              <span className="text-5xl font-bold">
                {report.readinessScore ?? 0}
              </span>

              <span className="mb-2 text-sm text-gray-600">
                / 100
              </span>

            </div>

          </div>

        </div>

        {/* ====================================
            STRENGTHS
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            Strengths
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            What you did well
          </h2>

          <div className="mt-6 space-y-3">

            {report.strengths?.length > 0 ? (
              report.strengths.map(
                (strength, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                  >
                    <p className="text-sm leading-6 text-gray-400">
                      <span className="mr-2 text-gray-200">
                        ✓
                      </span>

                      {strength}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-gray-600">
                No strengths identified.
              </p>
            )}

          </div>

        </section>

        {/* ====================================
            WEAKNESSES
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            Weaknesses
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Areas to improve
          </h2>

          <div className="mt-6 space-y-3">

            {report.weaknesses?.length > 0 ? (
              report.weaknesses.map(
                (weakness, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                  >
                    <p className="text-sm leading-6 text-gray-400">
                      <span className="mr-2 text-gray-500">
                        •
                      </span>

                      {weakness}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-gray-600">
                No major weaknesses identified.
              </p>
            )}

          </div>

        </section>

        {/* ====================================
            SKILL GAPS
        ==================================== */}

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            Skill Gaps
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            What to learn next
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            {report.skillGaps?.length > 0 ? (
              report.skillGaps.map(
                (skill, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4"
                  >
                    <p className="text-sm text-gray-400">
                      {skill}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-gray-600">
                No significant skill gaps identified.
              </p>
            )}

          </div>

        </section>

        {/* ====================================
            ACTIONS
        ==================================== */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() =>
              navigate("/interviews/setup")
            }
            className="flex-1 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Practice Again
          </button>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex-1 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </main>
  );
};

export default Report;