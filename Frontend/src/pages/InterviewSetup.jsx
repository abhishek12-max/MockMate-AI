import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const InterviewSetup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    experienceLevel: "fresher",
    interviewType: "mixed",
    totalQuestions: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExperience = (level) => {
    setFormData({
      ...formData,
      experienceLevel: level,
    });
  };

  const handleInterviewType = (type) => {
    setFormData({
      ...formData,
      interviewType: type,
    });
  };

  const handleQuestions = (number) => {
    setFormData({
      ...formData,
      totalQuestions: number,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.role.trim()) {
      setError("Please enter your target role.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/interviews",
        formData
      );

      console.log(
        "INTERVIEW CREATED:",
        response.data
      );

      const interviewId =
        response.data?.interviewId;

      if (!interviewId) {
        setError(
          "Interview created but interview ID was not received."
        );
        return;
      }

      navigate(`/interviews/${interviewId}`, {
        state: {
          questions: response.data.questions,
        },
      });

    } catch (error) {
      console.log(
        "INTERVIEW ERROR:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Unable to create interview."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white sm:px-6 sm:py-12">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="text-center">

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-600">
            AI Interview
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Build your interview
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Configure your interview and let MockMate AI
            generate questions based on your profile and skills.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Role */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">

            <label className="text-sm font-medium text-gray-300">
              Target Role
            </label>

            <p className="mt-1 text-xs text-gray-600">
              What position are you preparing for?
            </p>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. MERN Stack Developer"
              className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-700 focus:border-white/30"
            />

          </div>

          {/* Experience Level */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">

            <h2 className="text-sm font-medium text-gray-300">
              Experience Level
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

              {[
                ["fresher", "Fresher"],
                ["junior", "Junior"],
                ["mid", "Mid Level"],
                ["senior", "Senior"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    handleExperience(value)
                  }
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    formData.experienceLevel === value
                      ? "border-white/30 bg-white text-black"
                      : "border-white/10 bg-black/20 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>

          </div>

          {/* Interview Type */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">

            <h2 className="text-sm font-medium text-gray-300">
              Interview Type
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">

              {[
                ["technical", "Technical"],
                ["behavioral", "Behavioral"],
                ["mixed", "Mixed"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    handleInterviewType(value)
                  }
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    formData.interviewType === value
                      ? "border-white/30 bg-white text-black"
                      : "border-white/10 bg-black/20 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>

          </div>

          {/* Number of Questions */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">

            <h2 className="text-sm font-medium text-gray-300">
              Number of Questions
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">

              {[5, 6].map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() =>
                    handleQuestions(number)
                  }
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    formData.totalQuestions === number
                      ? "border-white/30 bg-white text-black"
                      : "border-white/10 bg-black/20 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {number} Questions
                </button>
              ))}

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Interview..."
              : "Start AI Interview →"}
          </button>

        </form>

      </div>

    </main>
  );
};

export default InterviewSetup;