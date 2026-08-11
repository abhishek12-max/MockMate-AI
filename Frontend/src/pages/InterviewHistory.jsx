import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/interviews/history");

        console.log("INTERVIEW HISTORY:", response.data);

        setInterviews(response.data?.interviews || []);
      } catch (error) {
        console.error("HISTORY ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load interview history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-sm text-gray-500">
            Loading interview history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
            MockMate AI
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Interview History
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review your previous interviews and track your progress.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && interviews.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
            <p className="text-lg font-medium">
              No interviews yet
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Start your first AI-powered interview to see your
              performance here.
            </p>

            <Link
              to="/interview/setup"
              className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Start Interview
            </Link>
          </div>
        )}

        {/* Interview List */}
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview._id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Interview Info */}
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-medium">
                      {interview.role || "Technical Interview"}
                    </h2>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide ${
                        interview.status === "completed"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {interview.status || "in progress"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {interview.interviewType ||
                      "Technical Interview"}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {interview.createdAt
                      ? new Date(
                          interview.createdAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>

                {/* Score + Action */}
                <div className="flex items-center gap-4">
                  {interview.status === "completed" && (
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-gray-600">
                        Score
                      </p>

                      <p className="text-xl font-semibold">
                        {interview.overallScore ?? "--"}
                        <span className="ml-1 text-xs text-gray-600">
                          /10
                        </span>
                      </p>
                    </div>
                  )}

                  {interview.status === "completed" ? (
                    <Link
                      to={`/interviews/${interview._id}/report`}
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
                    >
                      View Report →
                    </Link>
                  ) : (
                    <Link
                      to={`/interviews/${interview._id}`}
                      className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
                    >
                      Continue →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewHistory;